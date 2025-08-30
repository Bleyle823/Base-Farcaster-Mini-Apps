"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Button } from "./DemoComponents";

interface OneInchWidgetOptions {
  chainId: number;
  sourceTokenSymbol: string;
  destinationTokenSymbol: string;
  sourceTokenAmount?: string;
  theme?: 'light' | 'dark';
}

export function OneInchWidget() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const widgetHostRef = useRef<HTMLDivElement>(null);
  const [widgetOptions, setWidgetOptions] = useState<OneInchWidgetOptions>({
    chainId: 8453, // Base mainnet
    sourceTokenSymbol: "USDC",
    destinationTokenSymbol: "ETH",
    sourceTokenAmount: "100",
    theme: 'dark'
  });
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  // Create ethereum provider from wagmi
  const createEthereumProvider = () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      return null;
    }

    return {
      request: async (args: any) => {
        return window.ethereum.request(args);
      },
      enable: async (args: any) => {
        return window.ethereum.request(args);
      }
    };
  };

  // Setup 1inch widget
  const setupWidget = () => {
    if (!widgetHostRef.current || !isConnected || !chain) return;

    const provider = createEthereumProvider();
    if (!provider) return;

    // Clear existing widget
    if (widgetHostRef.current.firstChild) {
      widgetHostRef.current.innerHTML = '';
    }

    // Create iframe
    const iframe = document.createElement('iframe');
    const query = new URLSearchParams({
      sourceTokenAmount: widgetOptions.sourceTokenAmount || '',
      theme: widgetOptions.theme || 'dark'
    });

    const origin = 'https://app.1inch.io';
    iframe.id = 'oneInchWidgetFrame';
    iframe.src = `${origin}/#/${widgetOptions.chainId}/embedded-swap/${widgetOptions.sourceTokenSymbol}/${widgetOptions.destinationTokenSymbol}?${query}`;
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';

    // Handle iframe load
    iframe.onload = () => {
      setIsWidgetLoaded(true);
    };

    widgetHostRef.current.appendChild(iframe);

    // Setup message listener for JSON-RPC communication
    const handleMessage = (event: MessageEvent) => {
      if (event.data.jsonrpc === '2.0' && event.source === iframe.contentWindow) {
        handleJsonRpcRequest(event.data, provider);
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  };

  // Handle JSON-RPC requests from the widget
  const handleJsonRpcRequest = async (request: any, provider: any) => {
    try {
      const result = await provider.request(request);
      
      // Send response back to iframe
      if (request.source === iframe.contentWindow) {
        iframe.contentWindow?.postMessage({
          jsonrpc: '2.0',
          id: request.id,
          result
        }, '*');
      }
    } catch (error) {
      console.error('JSON-RPC request failed:', error);
      
      // Send error response back to iframe
      if (request.source === iframe.contentWindow) {
        iframe.contentWindow?.postMessage({
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32603,
            message: 'Internal error'
          }
        }, '*');
      }
    }
  };

  // Setup widget when component mounts or dependencies change
  useEffect(() => {
    if (isConnected && chain) {
      const cleanup = setupWidget();
      return cleanup;
    }
  }, [isConnected, chain, widgetOptions]);

  // Handle network switching
  const handleNetworkSwitch = async (newChainId: number) => {
    try {
      await switchNetwork?.(newChainId);
      setWidgetOptions(prev => ({ ...prev, chainId: newChainId }));
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  // Update widget options
  const updateWidgetOptions = (updates: Partial<OneInchWidgetOptions>) => {
    setWidgetOptions(prev => ({ ...prev, ...updates }));
  };

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Connect your wallet to use the 1inch swap widget
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Widget Configuration */}
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
        <h3 className="text-lg font-medium text-[var(--app-foreground)] mb-4">
          Widget Configuration
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Network
            </label>
            <select
              value={widgetOptions.chainId}
              onChange={(e) => handleNetworkSwitch(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
            >
              <option value={8453}>Base</option>
              <option value={1}>Ethereum</option>
              <option value={137}>Polygon</option>
              <option value={10}>Optimism</option>
              <option value={42161}>Arbitrum</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Theme
            </label>
            <select
              value={widgetOptions.theme}
              onChange={(e) => updateWidgetOptions({ theme: e.target.value as 'light' | 'dark' })}
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              From Token
            </label>
            <input
              type="text"
              value={widgetOptions.sourceTokenSymbol}
              onChange={(e) => updateWidgetOptions({ sourceTokenSymbol: e.target.value })}
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              placeholder="USDC"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              To Token
            </label>
            <input
              type="text"
              value={widgetOptions.destinationTokenSymbol}
              onChange={(e) => updateWidgetOptions({ destinationTokenSymbol: e.target.value })}
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              placeholder="ETH"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Amount
            </label>
            <input
              type="text"
              value={widgetOptions.sourceTokenAmount}
              onChange={(e) => updateWidgetOptions({ sourceTokenAmount: e.target.value })}
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              placeholder="100"
            />
          </div>
        </div>
      </div>

      {/* Widget Display */}
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
        <h3 className="text-lg font-medium text-[var(--app-foreground)] mb-4">
          1inch Swap Widget
        </h3>
        
        <div 
          ref={widgetHostRef}
          className={`w-full min-h-[600px] rounded-xl transition-all duration-300 ${
            isWidgetLoaded 
              ? 'border-2 border-[var(--app-accent)] shadow-lg' 
              : 'border border-[var(--app-card-border)]'
          }`}
        >
          {!isWidgetLoaded && (
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--app-accent)] mx-auto mb-4"></div>
                <p className="text-[var(--app-foreground-muted)]">Loading 1inch widget...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Network Info */}
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-5">
        <h3 className="text-lg font-medium text-[var(--app-foreground)] mb-4">
          Current Network
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              chain?.id === widgetOptions.chainId ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-[var(--app-foreground-muted)]">
              {chain?.id === widgetOptions.chainId ? 'Connected' : 'Mismatch'}
            </span>
          </div>
          <span className="text-[var(--app-foreground)]">
            {chain?.name || 'Unknown'} (ID: {chain?.id})
          </span>
        </div>
        
        {chain?.id !== widgetOptions.chainId && (
          <Button
            onClick={() => handleNetworkSwitch(widgetOptions.chainId)}
            className="mt-3"
          >
            Switch to {widgetOptions.chainId === 8453 ? 'Base' : `Network ${widgetOptions.chainId}`}
          </Button>
        )}
      </div>
    </div>
  );
}
