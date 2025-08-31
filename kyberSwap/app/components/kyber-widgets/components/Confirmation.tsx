import React from 'react';
import { TokenInfo } from '../constants';

interface ConfirmationProps {
  trade: any;
  tokenInInfo: TokenInfo;
  amountIn: string;
  tokenOutInfo: TokenInfo;
  amountOut: string;
  rate: number;
  priceImpact: number;
  slippage: number;
  deadline: number;
  client: string;
  onClose: () => void;
  onError: (e: any) => void;
  showDetail: boolean;
}

export default function Confirmation({
  trade,
  tokenInInfo,
  amountIn,
  tokenOutInfo,
  amountOut,
  rate,
  priceImpact,
  slippage,
  deadline,
  client,
  onClose,
  onError,
  showDetail
}: ConfirmationProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Confirm Swap</h3>
      
      <div className="space-y-4">
        <div className="p-3 border rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">You pay</span>
            <span className="font-medium">{amountIn} {tokenInInfo.symbol}</span>
          </div>
        </div>
        
        <div className="p-3 border rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">You receive</span>
            <span className="font-medium">{amountOut} {tokenOutInfo.symbol}</span>
          </div>
        </div>
        
        <div className="p-3 border rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Rate</span>
            <span className="font-medium">1 {tokenInInfo.symbol} = {rate.toFixed(6)} {tokenOutInfo.symbol}</span>
          </div>
        </div>
        
        <div className="p-3 border rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Price Impact</span>
            <span className="font-medium">{priceImpact.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="p-3 border rounded">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Slippage</span>
            <span className="font-medium">{slippage}%</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 p-3 border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Handle swap confirmation
            console.log('Swap confirmed');
          }}
          className="flex-1 p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm Swap
        </button>
      </div>
    </div>
  );
}
