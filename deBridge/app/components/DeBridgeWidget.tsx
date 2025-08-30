"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react";

declare global {
  interface Window {
    deBridge: any;
  }
}

const DeBridgeWidget = () => {
  useEffect(() => {
    // Create script tag for widget.js
    const script = document.createElement("script");
    script.src = "https://app.debridge.finance/assets/scripts/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.deBridge) {
        window.deBridge.widget({
          v: "1",
          element: "debridgeWidget",
          title: "DeBridge Cross-Chain Swap",
          description: "Swap tokens across multiple blockchains seamlessly",
          width: "100%",
          height: "600",
          r: null,
          supportedChains: {
            inputChains: {
              1: "all",
              10: "all",
              56: "all",
              100: "all",
              137: "all",
              146: "all",
              250: "all",
              388: "all",
              998: "all",
              1088: "all",
              1514: "all",
              2741: "all",
              4158: "all",
              7171: "all",
              8453: "all",
              42161: "all",
              43114: "all",
              59144: "all",
              80094: "all",
              7565164: "all",
              245022934: "all",
            },
            outputChains: {
              1: "all",
              10: "all",
              56: "all",
              100: "all",
              137: "all",
              146: "all",
              250: "all",
              388: "all",
              998: "all",
              1088: "all",
              1514: "all",
              2741: "all",
              4158: "all",
              7171: "all",
              8453: "all",
              42161: "all",
              43114: "all",
              59144: "all",
              80094: "all",
              7565164: "all",
              245022934: "all",
            },
          },
          inputChain: 8453, // Base chain
          outputChain: 1, // Ethereum mainnet
          inputCurrency: "",
          outputCurrency: "",
          address: "",
          showSwapTransfer: true,
          amount: "",
          outputAmount: "",
          isAmountFromNotModifiable: false,
          isAmountToNotModifiable: false,
          lang: "en",
          mode: "deswap",
          isEnableCalldata: false,
          styles: "e30=",
          theme: "light",
          isHideLogo: false,
          logo: "",
          disabledWallets: [],
          disabledElements: [],
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div id="debridgeWidget" className="w-full"></div>
    </div>
  );
};

export default DeBridgeWidget;
