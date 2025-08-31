import React, { createContext, useContext, ReactNode } from 'react';

interface Web3ProviderProps {
  chainId: number;
  connectedAccount: {
    address?: string;
    chainId: number;
  };
  rpcUrl?: string;
  onSubmitTx: (data: any) => Promise<string>;
  children: ReactNode;
}

const Web3Context = createContext<{
  chainId: number;
  connectedAccount: {
    address?: string;
    chainId: number;
  };
  rpcUrl?: string;
  onSubmitTx: (data: any) => Promise<string>;
} | null>(null);

export function Web3Provider({ 
  chainId, 
  connectedAccount, 
  rpcUrl, 
  onSubmitTx, 
  children 
}: Web3ProviderProps) {
  return (
    <Web3Context.Provider value={{ chainId, connectedAccount, rpcUrl, onSubmitTx }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useActiveWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useActiveWeb3 must be used within a Web3Provider');
  }
  return context;
}
