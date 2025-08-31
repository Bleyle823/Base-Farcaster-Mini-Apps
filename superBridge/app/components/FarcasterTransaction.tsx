"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther } from "viem";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { Card } from "./DemoComponents";
import { useFarcasterWallet } from "./FarcasterWalletProvider";
import { useNotification } from "@coinbase/onchainkit/minikit";

interface TransactionData {
  to: string;
  value: bigint;
  data?: `0x${string}`;
}

export function FarcasterTransaction() {
  const { isConnected, address, farcasterUser } = useFarcasterWallet();
  const { data: balanceData } = useBalance({ 
    address: address as `0x${string}` | undefined
  });
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  const sendNotification = useNotification();

  // Prepare transaction data
  const prepareTransaction = useCallback(() => {
    if (!address || !amount || !recipient) return;

    try {
      const value = parseEther(amount);
      setTransactionData({
        to: recipient,
        value,
        data: "0x" as `0x${string}`, // Simple ETH transfer
      });
      setIsPreparing(false);
    } catch (error) {
      console.error("Invalid amount:", error);
      setIsPreparing(false);
    }
  }, [address, amount, recipient]);

  // Write contract (transaction)
  const { writeContract, isPending: isWriting, data: hash } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSendTransaction = useCallback(async () => {
    if (!transactionData || !address) return;

    try {
      writeContract({
        to: transactionData.to as `0x${string}`,
        value: transactionData.value,
        data: transactionData.data,
      });
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  }, [writeContract, transactionData, address]);

  const handleSuccess = useCallback(async () => {
    if (hash) {
      await sendNotification({
        title: "Transaction Successful! 🎉",
        body: `Your transaction has been confirmed on Base network. Hash: ${hash.slice(0, 10)}...`,
      });
    }
  }, [hash, sendNotification]);

  // Reset form after successful transaction
  React.useEffect(() => {
    if (isSuccess) {
      handleSuccess();
      setAmount("");
      setRecipient("");
      setTransactionData(null);
    }
  }, [isSuccess, handleSuccess]);

  const isValidAmount = useMemo(() => {
    if (!amount || !balanceData) return false;
    try {
      const value = parseEther(amount);
      return value > 0n && value <= balanceData.value;
    } catch {
      return false;
    }
  }, [amount, balanceData]);

  const isValidRecipient = useMemo(() => {
    return recipient.length === 42 && recipient.startsWith("0x");
  }, [recipient]);

  if (!isConnected) {
    return (
      <Card title="Connect Your Farcaster Wallet" className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center mx-auto">
            <Icon name="heart" size="lg" className="text-[var(--app-accent)]" />
          </div>
          <p className="text-[var(--app-foreground-muted)]">
            Connect your Farcaster wallet to start making transactions
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card title="Farcaster Wallet Transaction" className="animate-fade-in">
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4 p-4 bg-[var(--app-accent-light)]/20 rounded-xl">
            {farcasterUser?.pfp && (
              <img
                src={farcasterUser.pfp}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-[var(--app-accent)]"
              />
            )}
            <div>
              <div className="font-semibold text-[var(--app-foreground)]">
                {farcasterUser?.displayName || farcasterUser?.username || "Farcaster User"}
              </div>
              <div className="text-sm text-[var(--app-foreground-muted)]">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              {balanceData && (
                <div className="text-sm font-medium text-[var(--app-accent)]">
                  Balance: {parseFloat(balanceData.formatted).toFixed(4)} {balanceData.symbol}
                </div>
              )}
            </div>
          </div>

          {/* Transaction Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)] transition-all"
              />
              {recipient && !isValidRecipient && (
                <p className="text-sm text-red-500 mt-1">Invalid Ethereum address</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
                Amount (ETH)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.01"
                className="w-full px-4 py-3 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)] transition-all"
              />
              {amount && !isValidAmount && (
                <p className="text-sm text-red-500 mt-1">
                  Invalid amount or insufficient balance
                </p>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={prepareTransaction}
              disabled={!isValidAmount || !isValidRecipient || isPreparing}
              className="w-full"
              icon={<Icon name="arrow-right" size="sm" />}
            >
              {isPreparing ? "Preparing..." : "Prepare Transaction"}
            </Button>
          </div>

          {/* Transaction Status */}
          {transactionData && (
            <div className="space-y-4 p-4 bg-[var(--app-accent-light)]/20 rounded-xl border border-[var(--app-accent)]/20">
              <h4 className="font-semibold text-[var(--app-foreground)]">Transaction Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--app-foreground-muted)]">To:</span>
                  <span className="font-mono">{transactionData.to.slice(0, 10)}...{transactionData.to.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--app-foreground-muted)]">Amount:</span>
                  <span>{formatEther(transactionData.value)} ETH</span>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="md"
                onClick={handleSendTransaction}
                disabled={isWriting || isConfirming}
                className="w-full"
                icon={<Icon name="check" size="sm" />}
              >
                {isWriting ? "Sending..." : isConfirming ? "Confirming..." : "Send Transaction"}
              </Button>
            </div>
          )}

          {/* Transaction Result */}
          {hash && (
            <div className="space-y-4 p-4 rounded-xl border">
              {isSuccess ? (
                <div className="text-center space-y-2 text-green-600 dark:text-green-400">
                  <Icon name="check" size="lg" className="mx-auto" />
                  <div className="font-semibold">Transaction Successful!</div>
                  <div className="text-sm font-mono break-all">
                    Hash: {hash.slice(0, 20)}...{hash.slice(-20)}
                  </div>
                </div>
              ) : isError ? (
                <div className="text-center space-y-2 text-red-600 dark:text-red-400">
                  <Icon name="check" size="lg" className="mx-auto" />
                  <div className="font-semibold">Transaction Failed</div>
                  <div className="text-sm">{error?.message}</div>
                </div>
              ) : (
                <div className="text-center space-y-2 text-[var(--app-accent)]">
                  <div className="w-6 h-6 border-2 border-[var(--app-accent)] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="font-semibold">Processing Transaction...</div>
                  <div className="text-sm font-mono break-all">
                    Hash: {hash.slice(0, 20)}...{hash.slice(-20)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
