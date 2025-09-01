"use client";

import { SwapWidget } from '@relayprotocol/relay-kit-ui';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useWalletClient } from 'wagmi';

// Helper function to adapt viem wallet client to Relay format
function adaptViemWallet(walletClient: any) {
  if (!walletClient) return undefined;
  
  return {
    address: walletClient.account?.address,
    signMessage: async (message: string) => {
      const signature = await walletClient.signMessage({ message });
      return signature;
    },
    signTransaction: async (transaction: any) => {
      const signature = await walletClient.signTransaction(transaction);
      return signature;
    },
    sendTransaction: async (transaction: any) => {
      const hash = await walletClient.sendTransaction(transaction);
      return hash;
    }
  };
}

export default function RelayWidget() {
  const { openConnectModal } = useConnectModal();
  const [fromToken, setFromToken] = useState({
    chainId: 8453, // Base
    address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    decimals: 6,
    name: 'USDC',
    symbol: 'USDC',
    logoURI: 'https://ethereum-optimism.github.io/data/USDC/logo.png'
  });
  
  const [toToken, setToToken] = useState({
    chainId: 10, // Optimism
    address: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    decimals: 6,
    name: 'USDC',
    symbol: 'USDC',
    logoURI: 'https://ethereum-optimism.github.io/data/USDC/logo.png'
  });

  const walletClient = useWalletClient();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Relay Cross-Chain Swap
        </h2>
        <SwapWidget
          wallet={adaptViemWallet(walletClient)}
          fromToken={fromToken}
          setFromToken={setFromToken}
          toToken={toToken}
          setToToken={setToToken}
          defaultAmount={'5'}
          supportedWalletVMs={['evm']}
          onConnectWallet={openConnectModal}
          onAnalyticEvent={(eventName, data) => {
            console.log('Analytic Event', eventName, data);
          }}
        />
      </div>
    </div>
  );
}
