"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import { WidgetsDemo } from "./components/SuperbridgeWidget";
import { WalletConnect } from "./components/WalletConnect";
import { FarcasterTransaction } from "./components/FarcasterTransaction";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

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
          className="text-[var(--app-accent)] p-4 hover:bg-[var(--app-accent-light)] transition-all duration-200"
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home setActiveTab={setActiveTab} />;
      case "features":
        return <Features setActiveTab={setActiveTab} />;
      case "widgets":
        return <WidgetsDemo setActiveTab={setActiveTab} />;
      case "transactions":
        return <FarcasterTransaction />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme bg-gradient-to-br from-[var(--app-background)] via-[var(--app-gray)] to-[var(--app-background)]">
      <div className="w-full px-6 py-6">
        <header className="flex justify-between items-center mb-6 h-14">
          <div className="flex items-center space-x-4">
            <WalletConnect />
          </div>
          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl px-4 py-2 border border-[var(--app-card-border)] shadow-lg">
            {saveFrameButton}
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl p-2 border border-[var(--app-card-border)] shadow-lg">
            {[
              { id: "home", label: "Home", icon: "heart" },
              { id: "features", label: "Features", icon: "star" },
              { id: "widgets", label: "Widgets", icon: "check" },
              { id: "transactions", label: "Transactions", icon: "arrow-right" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[var(--app-accent)] text-[var(--app-background)]"
                    : "hover:bg-[var(--app-accent-light)]"
                }`}
                icon={<Icon name={tab.icon as any} size="sm" />}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </nav>

        <main className="flex-1 max-w-6xl mx-auto">
          {renderTabContent()}
        </main>

        <footer className="mt-8 pt-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-sm hover:text-[var(--app-accent)] transition-colors duration-200"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
