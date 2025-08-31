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
      className={`w-full max-w-[420px] rounded-[24px] md:rounded-[32px] shadow-lg h-[606px] ${className}`}
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Superbridge Widget Demos</h1>
          <p className="text-[var(--app-foreground-muted)]">
            Explore different widget configurations and use cases
          </p>
        </div>
        <Button
          onClick={() => setActiveTab("home")}
          variant="ghost"
          icon={<Icon name="arrow-right" size="sm" className="rotate-180" />}
        >
          Back to Home
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Widget Variants</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(widgets).map(([key, { title, description }]) => (
              <div key={key} className="w-full">
                <Button
                  variant={activeWidget === key ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveWidget(key)}
                  className="w-full justify-start text-left"
                >
                  {title}
                </Button>
                {activeWidget === key && (
                  <p className="text-sm text-[var(--app-foreground-muted)] mt-2 px-2">
                    {description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <div className="flex justify-center">
            {widgets[activeWidget as keyof typeof widgets]?.component}
          </div>
        </div>
      </div>
    </div>
  );
};
