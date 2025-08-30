"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import { OneInchWidget } from "./components/OneInchWidget";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("1inch");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-[var(--app-card-bg)] rounded-lg p-1 border border-[var(--app-card-border)]">
            <button
              onClick={() => setActiveTab("1inch")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "1inch"
                  ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                  : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              }`}
            >
              1inch Swap
            </button>
            <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "home"
                  ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                  : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              }`}
            >
              Demo
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "features"
                  ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                  : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              }`}
            >
              Features
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
          {activeTab === "1inch" && <OneInchWidget />}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
