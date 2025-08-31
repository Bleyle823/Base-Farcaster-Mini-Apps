"use client";

import { useState } from "react";
import { Button } from "./DemoComponents";

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

export const SuperbridgeWidgetDemo = () => {
  const [activeWidget, setActiveWidget] = useState("default");

  const widgets = {
    default: { component: <SuperbridgeWidget />, title: "Default Widget" },
    themed: { component: <SuperbridgeWidgetThemed />, title: "Themed Widget" },
    token: { component: <SuperbridgeWidgetWithToken />, title: "Token Bridge (USDC)" },
    usdc: { component: <SuperbridgeWidgetUSDC />, title: "USDC Bridge" },
    cyber: { component: <SuperbridgeWidgetCyberTestnet />, title: "Cyber Testnet" }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(widgets).map(([key, { title }]) => (
          <Button
            key={key}
            variant={activeWidget === key ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveWidget(key)}
          >
            {title}
          </Button>
        ))}
      </div>
      
      <div className="flex justify-center">
        {widgets[activeWidget as keyof typeof widgets]?.component}
      </div>
    </div>
  );
};
