import React from 'react';
import { TokenInfo } from '../constants';

interface ImportModalProps {
  token: TokenInfo;
  onImport: () => void;
}

export default function ImportModal({ token, onImport }: ImportModalProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Import Token</h3>
      <div className="p-4 border rounded bg-yellow-50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
          <div>
            <div className="font-medium">{token.symbol}</div>
            <div className="text-sm text-gray-600">{token.name}</div>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          This token doesn't appear on the active token list. Make sure this is the token that you want to trade.
        </p>
        <button
          onClick={onImport}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Import
        </button>
      </div>
    </div>
  );
}
