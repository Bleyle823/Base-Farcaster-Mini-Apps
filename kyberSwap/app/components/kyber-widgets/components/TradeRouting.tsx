import React from 'react';
import { TokenInfo } from '../constants';

interface TradeRoutingProps {
  trade: any;
  currencyIn: TokenInfo;
  currencyOut: TokenInfo;
}

export default function TradeRouting({ trade, currencyIn, currencyOut }: TradeRoutingProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Your Trade Route</h3>
      <div className="space-y-3">
        <div className="p-3 border rounded">
          <div className="flex items-center justify-between">
            <span className="font-medium">Route</span>
            <span className="text-sm text-gray-600">Best Route</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {currencyIn.symbol} → {currencyOut.symbol}
          </div>
        </div>
        
        <div className="p-3 border rounded">
          <div className="flex items-center justify-between">
            <span className="font-medium">Price Impact</span>
            <span className="text-sm text-gray-600">Low</span>
          </div>
        </div>
        
        <div className="p-3 border rounded">
          <div className="flex items-center justify-between">
            <span className="font-medium">Gas Fee</span>
            <span className="text-sm text-gray-600">~$5.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
