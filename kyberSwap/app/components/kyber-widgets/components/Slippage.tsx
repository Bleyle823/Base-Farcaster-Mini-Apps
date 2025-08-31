import React from 'react';

interface SlippageProps {
  slippage: number;
  setSlippage: (slippage: number) => void;
}

export default function Slippage({ slippage, setSlippage }: SlippageProps) {
  const presetValues = [0.1, 0.5, 1.0];

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Slippage Tolerance</span>
        <span className="text-sm text-gray-600">{slippage}%</span>
      </div>
      <div className="flex space-x-2">
        {presetValues.map((value) => (
          <button
            key={value}
            onClick={() => setSlippage(value)}
            className={`px-3 py-1 text-sm rounded ${
              slippage === value
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            {value}%
          </button>
        ))}
        <input
          type="number"
          value={slippage}
          onChange={(e) => setSlippage(Number(e.target.value))}
          className="w-20 px-2 py-1 text-sm border rounded"
          min="0.1"
          max="50"
          step="0.1"
        />
      </div>
    </div>
  );
}
