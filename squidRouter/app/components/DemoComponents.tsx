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
            // Basic configuration for the widget
            slippage: 0.5,
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
