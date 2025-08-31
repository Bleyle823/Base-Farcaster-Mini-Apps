import { useState, useEffect } from 'react';

interface UseSwapProps {
  defaultTokenIn?: string;
  defaultTokenOut?: string;
  defaultAmountIn?: string;
  defaultSlippage?: number;
  feeSetting?: any;
  enableDexes?: string;
  client: string;
}

export default function useSwap({
  defaultTokenIn,
  defaultTokenOut,
  defaultAmountIn,
  defaultSlippage,
  feeSetting,
  enableDexes,
  client
}: UseSwapProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenIn, setTokenIn] = useState(defaultTokenIn || '');
  const [tokenOut, setTokenOut] = useState(defaultTokenOut || '');
  const [inputAmount, setInputAmount] = useState(defaultAmountIn || '');
  const [slippage, setSlippage] = useState(defaultSlippage || 0.5);
  const [deadline, setDeadline] = useState(20);
  const [trade, setTrade] = useState(null);
  const [allDexes, setAllDexes] = useState([]);
  const [excludedDexes, setExcludedDexes] = useState([]);
  const [isWrap, setIsWrap] = useState(false);
  const [isUnwrap, setIsUnwrap] = useState(false);

  const getRate = async () => {
    if (!tokenIn || !tokenOut || !inputAmount) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock trade data
      const mockTrade = {
        routeSummary: {
          amountIn: inputAmount,
          amountOut: (parseFloat(inputAmount) * 0.98).toString(),
          amountInUsd: (parseFloat(inputAmount) * 2000).toString(),
          amountOutUsd: (parseFloat(inputAmount) * 0.98 * 2000).toString(),
          gasUsd: '5.00',
          routerAddress: '0x1234567890123456789012345678901234567890'
        }
      };
      
      setTrade(mockTrade);
    } catch (err) {
      setError('Failed to get rate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenIn && tokenOut && inputAmount) {
      getRate();
    }
  }, [tokenIn, tokenOut, inputAmount]);

  return {
    loading,
    error,
    tokenIn,
    tokenOut,
    setTokenIn,
    setTokenOut,
    inputAmout: inputAmount,
    setInputAmount,
    trade,
    slippage,
    setSlippage,
    getRate,
    deadline,
    setDeadline,
    allDexes,
    excludedDexes,
    setExcludedDexes,
    setTrade,
    isWrap,
    isUnwrap,
  };
}
