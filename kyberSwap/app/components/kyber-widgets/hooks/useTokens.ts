import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { TokenInfo } from '../constants';

interface TokenListProviderProps {
  tokenList: TokenInfo[];
  children: ReactNode;
}

const TokenListContext = createContext<{
  tokens: TokenInfo[];
} | null>(null);

export function TokenListProvider({ tokenList, children }: TokenListProviderProps) {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    // Default tokens if none provided
    const defaultTokens: TokenInfo[] = [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        decimals: 18,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        chainId: 1,
      },
      {
        name: 'USD Coin',
        symbol: 'USDC',
        address: '0xA0b86a33E6441b8c4C8C0b4b4b4b4b4b4b4b4b4b',
        decimals: 6,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
        chainId: 1,
      },
      {
        name: 'Wrapped Ether',
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        decimals: 18,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png',
        chainId: 1,
      },
    ];

    setTokens(tokenList.length > 0 ? tokenList : defaultTokens);
  }, [tokenList]);

  return (
    <TokenListContext.Provider value={{ tokens }}>
      {children}
    </TokenListContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenListContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenListProvider');
  }
  return context.tokens;
}
