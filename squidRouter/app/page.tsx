"use client";

import { SquidWidgetComponent } from "./components/DemoComponents";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl px-4">
        <SquidWidgetComponent />
      </div>
    </div>
  );
}
