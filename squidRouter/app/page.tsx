"use client";

import { SquidWidgetComponent } from "./components/DemoComponents";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <main className="flex-1 p-4">
        <SquidWidgetComponent />
      </main>
    </div>
  );
}
