"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import SquidWidget with no SSR to prevent document is not defined error
const SquidWidget = dynamic(
  () => import("@0xsquid/widget").then((mod) => ({ default: mod.SquidWidget })),
  { ssr: false }
);

export function SquidWidgetComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full max-w-4xl h-[600px] mx-auto bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Squid Router...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cross-Chain Swap</h1>
        <p className="text-gray-600">Swap tokens across multiple blockchains with the best rates</p>
      </div>

      {/* Widget Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <SquidWidget
          config={{
            integratorId: "squid-router-mini-app",
            apiUrl: "https://apiplus.squidrouter.com",
            // Enhanced configuration for better UX
            appearance: {
              theme: "light",
              borderRadius: 12,
              primaryColor: "#3B82F6",
              secondaryColor: "#6B7280",
              fontFamily: "Inter, system-ui, sans-serif",
            },
            // Default tokens for better user experience
            defaultTokens: {
              fromToken: {
                address: "0x4200000000000000000000000000000000000006", // WETH on Base
                chainId: 8453, // Base
                decimals: 18,
                logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
                name: "Wrapped Ether",
                symbol: "WETH",
                coingeckoId: "weth",
              },
              toToken: {
                address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
                chainId: 8453, // Base
                decimals: 6,
                logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
                name: "USD Coin",
                symbol: "USDC",
                coingeckoId: "usd-coin",
              },
            },
            // Enable slippage protection
            slippage: 0.5,
            // Enable gas estimation
            enableGasEstimation: true,
            // Enable transaction history
            enableTransactionHistory: true,
            // Enable notifications
            enableNotifications: true,
            // Custom RPC endpoints for better performance
            rpcUrls: {
              1: "https://eth.llamarpc.com", // Ethereum
              8453: "https://mainnet.base.org", // Base
              137: "https://polygon-rpc.com", // Polygon
              42161: "https://arb1.arbitrum.io/rpc", // Arbitrum
              10: "https://mainnet.optimism.io", // Optimism
            },
            // Enable popular chains
            chains: [
              { id: 1, name: "Ethereum" },
              { id: 8453, name: "Base" },
              { id: 137, name: "Polygon" },
              { id: 42161, name: "Arbitrum" },
              { id: 10, name: "Optimism" },
              { id: 56, name: "BNB Chain" },
              { id: 43114, name: "Avalanche" },
            ],
          }}
        />
      </div>

      {/* Footer Info */}
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>Powered by Squid Router • Secure cross-chain swaps</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Live
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Multi-chain
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Best rates
          </span>
        </div>
      </div>
    </div>
  );
}
