"use client";

import dynamic from "next/dynamic";

// Dynamically import SquidWidget with no SSR to prevent document is not defined error
const SquidWidget = dynamic(
  () => import("@0xsquid/widget").then((mod) => ({ default: mod.SquidWidget })),
  { ssr: false }
);

export function SquidWidgetComponent() {
  return (
    <div className="w-full max-w-4xl h-[600px] mx-auto">
      <SquidWidget
        config={{
          integratorId: "squid-router-mini-app",
          apiUrl: "https://apiplus.squidrouter.com"
        }}
      />
    </div>
  );
}
