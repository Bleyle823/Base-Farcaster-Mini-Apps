import React from 'react';
import { TokenInfo } from '../constants';

interface SelectCurrencyProps {
  selectedToken: string;
  onChange: (token: TokenInfo) => void;
  onImport: (token: TokenInfo) => void;
}

export default function SelectCurrency({ selectedToken, onChange, onImport }: SelectCurrencyProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Select Token</h3>
      <div className="space-y-2">
        <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-medium">ETH</div>
              <div className="text-sm text-gray-500">Ethereum</div>
            </div>
          </div>
        </div>
        <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            <div>
              <div className="font-medium">USDC</div>
              <div className="text-sm text-gray-500">USD Coin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
