import { useState, useEffect } from 'react';

export default function useTokenBalances(tokenAddresses: string[]) {
  const [balances, setBalances] = useState<Record<string, bigint>>({});
  const [loading, setLoading] = useState(false);

  const refetch = async () => {
    if (tokenAddresses.length === 0) return;
    
    setLoading(true);
    try {
      // Mock balances - in real implementation, this would fetch from blockchain
      const mockBalances: Record<string, bigint> = {};
      tokenAddresses.forEach(address => {
        // Generate random balance between 0 and 1000 ETH
        const randomBalance = Math.random() * 1000;
        mockBalances[address] = BigInt(Math.floor(randomBalance * 10 ** 18));
      });
      
      setBalances(mockBalances);
    } catch (error) {
      console.error('Failed to fetch token balances:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [tokenAddresses.join(',')]);

  return {
    balances,
    loading,
    refetch,
  };
}
