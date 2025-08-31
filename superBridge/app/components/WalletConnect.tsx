"use client";

import React from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { useFarcasterWallet } from "./FarcasterWalletProvider";

export function WalletConnect() {
  const {
    isConnected,
    address,
    balance,
    connect,
    disconnect,
    isLoading,
    error,
    farcasterUser,
  } = useFarcasterWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl px-4 py-2 border border-[var(--app-card-border)] shadow-lg">
        <div className="w-4 h-4 border-2 border-[var(--app-accent)] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-[var(--app-foreground-muted)]">Connecting...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-red-200 dark:border-red-800 shadow-lg">
        <Icon name="check" size="sm" className="text-red-500" />
        <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => connect()}
          className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/20"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3 bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl px-4 py-2 border border-[var(--app-card-border)] shadow-lg">
        {/* Farcaster User Info */}
        {farcasterUser?.pfp && (
          <div className="flex items-center space-x-2">
            <img
              src={farcasterUser.pfp}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-[var(--app-accent)]"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-[var(--app-foreground)]">
                {farcasterUser.displayName || farcasterUser.username || "Farcaster User"}
              </div>
              {farcasterUser.fid && (
                <div className="text-xs text-[var(--app-foreground-muted)]">
                  FID: {farcasterUser.fid}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Wallet Info */}
        <div className="hidden sm:block border-l border-[var(--app-card-border)] pl-3">
          <div className="text-sm font-medium text-[var(--app-foreground)]">
            {formatAddress(address)}
          </div>
          {balance && (
            <div className="text-xs text-[var(--app-foreground-muted)]">
              {balance}
            </div>
          )}
        </div>
        
        {/* Disconnect Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnect}
          className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] hover:bg-[var(--app-accent-light)]"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={connect}
      className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] shadow-lg hover:shadow-xl transition-all duration-200"
      icon={<Icon name="wallet" size="sm" />}
    >
      Connect Wallet
    </Button>
  );
}
