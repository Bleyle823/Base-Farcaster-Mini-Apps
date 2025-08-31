"use client";

import React from "react";

interface WidgetProps {
  src?: string;
  className?: string;
}

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
