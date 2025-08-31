"use client";

import { useState } from "react";
import { Button, Icon } from "./DemoComponents";

type WidgetProps = {
  src?: string;
  className?: string;
};

export const SuperbridgeWidget = ({ 
  src = "https://superbridge.app?widget=true",
  className = ""
}: WidgetProps) => {
  return (
    <iframe
      src={src}
      className={`w-full max-w-[600px] rounded-[24px] md:rounded-[32px] shadow-2xl h-[700px] border-2 border-[var(--app-card-border)] ${className}`}
      title="Superbridge Widget"
    />
  );
};

export const SuperbridgeWidgetThemed = () => {
  return (
    <SuperbridgeWidget
      src={`https://superbridge.app?widget=true&theme={"primary":"green"}`}
    />
  );
};

export const SuperbridgeWidgetWithToken = () => {
  return (
    <SuperbridgeWidget 
      src="https://v3.superbridge.app?widget=true&fromChainId=8453&toChainId=10&tokenAddress=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" 
    />
  );
};

export const SuperbridgeWidgetUSDC = () => {
  return (
    <SuperbridgeWidget 
      src="https://a708991b-616a-406d-9318-c393803f684c.bridges.rollbridge.app" 
    />
  );
};

export const SuperbridgeWidgetCyberTestnet = () => {
  return (
    <SuperbridgeWidget 
      src="https://cyber-testnet.v3.testnets.rollbridge.app/?widget=true" 
    />
  );
};

export const WidgetsDemo = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [activeWidget, setActiveWidget] = useState("default");

  const widgets = {
    default: { 
      component: <SuperbridgeWidget />, 
      title: "Default Widget",
      description: "Standard Superbridge widget for general bridging"
    },
    themed: { 
      component: <SuperbridgeWidgetThemed />, 
      title: "Themed Widget",
      description: "Custom themed widget with green primary color"
    },
    token: { 
      component: <SuperbridgeWidgetWithToken />, 
      title: "Token Bridge (USDC)",
      description: "Pre-configured for USDC bridging from Base to Optimism"
    },
    usdc: { 
      component: <SuperbridgeWidgetUSDC />, 
      title: "USDC Bridge",
      description: "Direct USDC bridging interface"
    },
    cyber: { 
      component: <SuperbridgeWidgetCyberTestnet />, 
      title: "Cyber Testnet",
      description: "Bridge to Cyber testnet network"
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-4 bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] bg-clip-text text-transparent">
          Widget Demos
        </h1>
        <p className="text-xl text-[var(--app-foreground-muted)] max-w-3xl mx-auto mb-6">
          Explore different Superbridge widget configurations and use cases
        </p>
        <Button
          onClick={() => setActiveTab("home")}
          variant="outline"
          size="lg"
          icon={<Icon name="arrow-right" size="sm" className="rotate-180" />}
          className="px-8 py-3 text-lg hover:bg-[var(--app-accent)] hover:text-[var(--app-background)] transition-all duration-200"
        >
          Back to Home
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl p-6 border border-[var(--app-card-border)] shadow-lg">
            <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">Widget Variants</h2>
            <div className="space-y-3">
              {Object.entries(widgets).map(([key, { title, description }]) => (
                <div key={key} className="space-y-2">
                  <Button
                    variant={activeWidget === key ? "primary" : "outline"}
                    size="md"
                    onClick={() => setActiveWidget(key)}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                  >
                    <div className="text-left">
                      <div className="font-medium">{title}</div>
                      {activeWidget === key && (
                        <div className="text-xs text-[var(--app-foreground-muted)] mt-1 opacity-80">
                          {description}
                        </div>
                      )}
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl p-6 border border-[var(--app-card-border)] shadow-lg">
            <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">Live Preview</h2>
            <div className="flex justify-center">
              {widgets[activeWidget as keyof typeof widgets]?.component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
