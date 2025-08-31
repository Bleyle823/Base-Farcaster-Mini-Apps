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

        <main className="flex-1 max-w-6xl mx-auto">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
          {activeTab === "widgets" && <WidgetsDemo setActiveTab={setActiveTab} />}
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
