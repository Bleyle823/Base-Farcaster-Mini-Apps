"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";

interface FarcasterWalletContextType {
  isConnected: boolean;
  address: string | undefined;
  balance: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
  error: string | null;
  farcasterUser: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfp?: string;
  } | null;
}

const FarcasterWalletContext = createContext<FarcasterWalletContextType | undefined>(undefined);

export function useFarcasterWallet() {
  const context = useContext(FarcasterWalletContext);
  if (context === undefined) {
    throw new Error("useFarcasterWallet must be used within a FarcasterWalletProvider");
  }
  return context;
}

interface FarcasterWalletProviderProps {
  children: ReactNode;
}

export function FarcasterWalletProvider({ children }: FarcasterWalletProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [farcasterUser, setFarcasterUser] = useState<{
    fid?: number;
    username?: string;
    displayName?: string;
    pfp?: string;
  } | null>(null);

  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({
    address,
  });

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to connect to any injected wallet
      await connect({
        connector: injected(),
      });
      
      // Fetch Farcaster user data if connected
      if (address) {
        await fetchFarcasterUserData(address);
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
      setFarcasterUser(null);
      setError(null);
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
      setError(err instanceof Error ? err.message : "Failed to disconnect wallet");
    }
  };

  const fetchFarcasterUserData = async (userAddress: string) => {
    try {
      // Try to fetch Farcaster user data from Warpcast API
      const response = await fetch(`https://api.warpcast.com/v2/user-by-address?address=${userAddress}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.user) {
          setFarcasterUser({
            fid: data.user.fid,
            username: data.user.username,
            displayName: data.user.displayName,
            pfp: data.user.pfp?.url,
          });
          return;
        }
      }

      // If no Farcaster data found, set basic user info
      setFarcasterUser({
        fid: undefined,
        username: undefined,
        displayName: undefined,
        pfp: undefined,
      });
    } catch (err) {
      console.error("Failed to fetch Farcaster user data:", err);
      // Don't set error here as it's not critical
    }
  };

  useEffect(() => {
    if (address && isConnected) {
      fetchFarcasterUserData(address);
    }
  }, [address, isConnected]);

  const value: FarcasterWalletContextType = {
    isConnected,
    address,
    balance: balanceData ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}` : undefined,
    connect: connectWallet,
    disconnect: disconnectWallet,
    isLoading: isLoading || isConnecting,
    error,
    farcasterUser,
  };

  return (
    <FarcasterWalletContext.Provider value={value}>
      {children}
    </FarcasterWalletContext.Provider>
  );
}
