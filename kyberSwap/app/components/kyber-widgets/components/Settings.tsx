import React from 'react';

interface SettingsProps {
  slippage: number;
  setSlippage: (slippage: number) => void;
  deadline: number;
  setDeadline: (deadline: number) => void;
  allDexes: any[];
  excludedDexes: any[];
  onShowSource: () => void;
}

export default function Settings({ 
  slippage, 
  setSlippage, 
  deadline, 
  setDeadline, 
  allDexes, 
  excludedDexes, 
  onShowSource 
}: SettingsProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Settings</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Slippage Tolerance (%)</label>
        <input
          type="number"
          value={slippage}
          onChange={(e) => setSlippage(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="0.1"
          max="50"
          step="0.1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Transaction Deadline (minutes)</label>
        <input
          type="number"
          value={deadline}
          onChange={(e) => setDeadline(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
          max="60"
        />
      </div>
      
      <button
        onClick={onShowSource}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Liquidity Sources
      </button>
    </div>
  );
}
