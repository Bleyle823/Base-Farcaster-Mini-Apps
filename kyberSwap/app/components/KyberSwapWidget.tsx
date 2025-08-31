"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { usePublicClient } from "wagmi";

// Import the KyberSwap widget components
import SwapWidget from "./kyber-widgets/Widget";

export default function KyberSwapWidget() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();

  const [chainId, setChainId] = useState(1);

  useEffect(() => {
    if (publicClient) {
      publicClient.getChainId().then(setChainId);
    }
  }, [publicClient]);

  const defaultTokenOut = {
    1: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // ETH on mainnet
    8453: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // ETH on Base
  };

  const lightTheme = {
    text: "#222222",
    subText: "#5E5E5E",
    primary: "#FFFFFF",
    dialog: "#FBFBFB",
    secondary: "#F5F5F5",
    interactive: "#E5E5E5",
    outline: "#E5E5E5",
    accent: "#0052FF",
    success: "#00C896",
    warning: "#FF6B35",
    error: "#FF3B69",
    chart: "#0052FF",
    chartOther: "#E5E5E5",
    fontFamily: "Inter",
    borderRadius: "12px",
    buttonRadius: "12px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
    buttonPadding: "12px 24px",
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <h2 className="text-xl font-semibold">Connect Wallet to Swap</h2>
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    );
  }



  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">KyberSwap</h2>
          <button
            onClick={() => disconnect()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Disconnect
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <SwapWidget
          client="kyberswap-mini-app"
          theme={lightTheme}
          tokenList={[]}
          defaultTokenOut={defaultTokenOut[chainId as keyof typeof defaultTokenOut]}
          enableRoute={true}
          chainId={chainId}
          connectedAccount={{
            address: address,
            chainId: chainId
          }}
          onSubmitTx={async (data: any) => {
            // Handle transaction submission
            console.log('Transaction data:', data);
            return '0x1234567890abcdef'; // Mock transaction hash
          }}
        />
      </div>
    </div>
  );
}
