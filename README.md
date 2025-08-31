# DEX Mini Apps Collection 🚀

A comprehensive collection of mini applications for popular decentralized exchanges (DEXs), built with Farcaster compatibility in mind. Trade, swap, and interact with DeFi protocols directly from your favorite social platform.

## 🌟 Features

- **Multi-Chain Support**: Compatible with Ethereum, Polygon, BSC, Arbitrum, and more
- **Farcaster Integration**: Seamless integration with Farcaster frames and actions
- **Responsive Design**: Mobile-first approach optimized for social media viewing
- **Real-time Data**: Live price feeds and liquidity information
- **One-Click Trading**: Simplified swap interfaces for quick transactions
- **Portfolio Tracking**: View balances and transaction history across protocols

## 🏗️ Supported DEXs

| DEX | Chains | Features | Status |
|-----|--------|----------|--------|
| **1inch** | Ethereum, Polygon, BSC, Arbitrum | Aggregated swaps, best rates | 🟠 Live |
| **Balancer** | Ethereum, Polygon, Arbitrum | Weighted pools, LBP | ❌ Live |
| **deBridge** | Multi-chain | Cross-chain swaps, bridging |✅  Live |
| **KyberSwap** | Ethereum, Polygon, BSC, Arbitrum | Dynamic MM, limit orders | ❌ Live |
| **PancakeSwap** | BSC, Ethereum, Arbitrum | AMM, farms, pools | ❌ Live |
| **QuickSwap** | Polygon, Ethereum | Dragon's Lair, dual rewards | ❌ Live |
| **SushiSwap** | Multi-chain | AMM, onsen farms, kashi | ❌ Live |
| **Uniswap** | Ethereum, Polygon, Arbitrum, Optimism | V3 concentrated liquidity | ❌ Live |

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
npm or yarn
MetaMask or WalletConnect compatible wallet
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dex-mini-apps.git
cd dex-mini-apps

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key

# Farcaster Integration
NEXT_PUBLIC_FARCASTER_HUB_URL=https://nemes.farcaster.xyz:2281
FARCASTER_DEVELOPER_MNEMONIC=your_mnemonic_phrase

# DEX API Keys (Optional for enhanced features)
ONEINCH_API_KEY=your_1inch_api_key
KYBER_API_KEY=your_kyber_api_key

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 📱 Farcaster Integration

This collection is optimized for Farcaster frames, enabling users to:

- **Swap Tokens**: Execute trades directly from Farcaster posts
- **Check Prices**: View real-time token prices and charts
- **Portfolio View**: Display wallet balances and positions
- **Share Trades**: Post successful swaps to your feed

### Frame Implementation

Each DEX mini app implements the Farcaster Frame specification:

```typescript
// Example frame metadata
export const frameMetadata = {
  version: "next",
  imageUrl: `${baseUrl}/api/og/swap`,
  buttons: [
    { label: "Swap ETH → USDC", action: "post" },
    { label: "View Pool", action: "link", target: "https://..." },
  ],
  postUrl: `${baseUrl}/api/frame/swap`,
};
```



## 🔧 Usage Examples


### Farcaster Frame Integration

```typescript
import { createSwapFrame } from './packages/farcaster-sdk';

export async function POST(req: Request) {
  const frameData = await createSwapFrame({
    dex: 'uniswap',
    tokenPair: 'ETH/USDC',
    amount: req.body.amount,
  });
  
  return new Response(frameData.html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

## 🔗 API Reference



### Farcaster Actions

```typescript
// Share successful trade
await shareToFarcaster({
  text: "Just swapped 1 ETH for 2,500 USDC on @uniswap! 🦄",
  frameUrl: "/frames/uniswap/swap-success",
});

// Create price alert frame
await createPriceFrame({
  dex: "1inch",
  token: "ETH",
  threshold: 2500,
});
```

## 🎨 Customization

### Adding New DEXs

1. Create a new app directory: `apps/your-dex/`
2. Implement the `DexMiniApp` interface
3. Add Farcaster frame support
4. Update the main router configuration


## 🔐 Security

- **Wallet Security**: Never store private keys or mnemonics
- **API Rate Limits**: Implemented for all external API calls
- **Input Validation**: All user inputs are sanitized and validated
- **Slippage Protection**: Default and maximum slippage limits
- **MEV Protection**: Integration with Flashbots Protect where available

## 📊 Analytics & Monitoring

- **Trade Volume**: Track swaps across all supported DEXs
- **User Engagement**: Monitor Farcaster frame interactions
- **Error Tracking**: Comprehensive error logging and alerts
- **Performance**: Real-time monitoring of swap success rates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-dex`
3. Make your changes and add tests
4. Submit a pull request

### Adding a New DEX

1. Follow the [DEX Integration Guide](docs/adding-new-dex.md)
2. Ensure Farcaster compatibility
3. Add comprehensive tests
4. Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: [docs.dex-mini-apps.com](https://docs.dex-mini-apps.com)
- **Demo**: [demo.dex-mini-apps.com](https://demo.dex-mini-apps.com)
- **Farcaster Channel**: [/dex-apps](https://warpcast.com/~/channel/dex-apps)
- **Discord**: [Join our community](https://discord.gg/dex-mini-apps)

## 🙏 Acknowledgments

- Farcaster team for the amazing protocol
- DEX protocol teams for their open APIs
- Web3 community for continuous innovation

---

**⚠️ Disclaimer**: This software is provided as-is. Always verify transactions and be aware of smart contract risks. Never invest more than you can afford to lose.

---

<div align="center">
  <strong>Built with ❤️ for the DeFi community</strong>
</div>
