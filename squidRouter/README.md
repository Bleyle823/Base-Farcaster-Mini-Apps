# Squid Router Widget - Cross-Chain Swap

A fully functional cross-chain swap widget built with Squid Router, Next.js, and Tailwind CSS.

## Features

✅ **Cross-Chain Swaps** - Swap tokens across multiple blockchains  
✅ **Best Rates** - Automatically finds the best swap routes  
✅ **Slippage Protection** - Configurable slippage tolerance  
✅ **Modern UI** - Beautiful, responsive design with animations  
✅ **Multi-Chain Support** - Ethereum, Base, Polygon, Arbitrum, Optimism, and more  
✅ **Real-Time Updates** - Live price feeds and gas estimates  

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The widget is pre-configured with:
- **Integrator ID**: `squid-router-mini-app`
- **API URL**: `https://apiplus.squidrouter.com`
- **Default Slippage**: 0.5%
- **Supported Chains**: Ethereum, Base, Polygon, Arbitrum, Optimism, BNB Chain, Avalanche

## How to Use

1. **Connect Wallet**: Click "Connect Wallet" to connect your web3 wallet
2. **Select Tokens**: Choose the token you want to swap from and to
3. **Select Chains**: Pick the source and destination blockchains
4. **Review Route**: The widget will show you the best swap route
5. **Execute Swap**: Review the details and confirm the transaction

## Supported Features

- **Token Selection**: Search and select from thousands of tokens
- **Chain Selection**: Choose from major EVM-compatible blockchains
- **Route Optimization**: Automatic route finding for best rates
- **Gas Estimation**: Real-time gas cost estimates
- **Transaction History**: Track your swap history
- **Slippage Protection**: Customizable slippage tolerance

## Technical Details

- **Framework**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with custom animations
- **Widget**: @0xsquid/widget v4.4.0
- **Web3**: Wagmi v2 + Viem v2
- **Deployment**: Ready for Vercel, Netlify, or any Next.js hosting

## Customization

You can customize the widget by modifying the `config` object in `DemoComponents.tsx`:

```tsx
<SquidWidget
  config={{
    integratorId: "your-integrator-id",
    apiUrl: "https://apiplus.squidrouter.com",
    slippage: 0.5, // Custom slippage
    // Add more configuration options as needed
  }}
/>
```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform:
   - **Vercel**: `vercel --prod`
   - **Netlify**: `netlify deploy --prod`
   - **Custom Server**: `npm start`

## Support

- **Squid Router Docs**: [https://docs.squidrouter.com/](https://docs.squidrouter.com/)
- **Widget Documentation**: [https://docs.squidrouter.com/widget](https://docs.squidrouter.com/widget)
- **Discord**: [https://discord.gg/squidrouter](https://discord.gg/squidrouter)

## License

MIT License - see LICENSE file for details
