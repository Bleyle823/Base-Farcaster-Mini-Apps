import React from 'react';

interface DexesSettingProps {
  allDexes: any[];
  excludedDexes: any[];
  setExcludedDexes: (dexes: any[]) => void;
}

export default function DexesSetting({ allDexes, excludedDexes, setExcludedDexes }: DexesSettingProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Liquidity Sources</h3>
      <div className="space-y-3">
        {allDexes.map((dex) => (
          <div key={dex.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span className="font-medium">{dex.name}</span>
            </div>
            <input
              type="checkbox"
              checked={!excludedDexes.includes(dex.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setExcludedDexes(excludedDexes.filter(id => id !== dex.id));
                } else {
                  setExcludedDexes([...excludedDexes, dex.id]);
                }
              }}
              className="w-4 h-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
