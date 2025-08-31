# Superbridge Mini App

A powerful cross-chain bridge mini app built on Base with MiniKit, featuring Farcaster wallet integration.

## Features

- 🌉 **Cross-Chain Bridging**: Bridge assets between Ethereum, Base, Polygon, and more
- 🦊 **Farcaster Wallet Support**: Connect and transact with your Farcaster wallet
- 💰 **Transaction Management**: Send ETH, view balances, and manage assets
- 🎨 **Beautiful UI**: Modern, responsive design with dark mode support
- ⚡ **Fast & Secure**: Built on Base network with enterprise-grade security

## Farcaster Wallet Integration

This mini app now supports Farcaster wallets, allowing users to:

- Connect their Farcaster wallet seamlessly
- View wallet balance and transaction history
- Send ETH transactions through the Farcaster wallet
- Access Farcaster user profile information
- Perform cross-chain bridging operations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Farcaster wallet (Warpcast, etc.)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
   NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Superbridge Mini App
   NEXT_PUBLIC_ICON_URL=https://your-domain.com/logo.png
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Connecting Your Farcaster Wallet

1. Click "Connect Farcaster" in the header
2. Approve the connection in your wallet
3. View your profile and balance information

### Making Transactions

1. Navigate to the "Transactions" tab
2. Enter recipient address and amount
3. Review transaction details
4. Confirm and send the transaction

### Cross-Chain Bridging

1. Use the Superbridge widget on the home page
2. Select source and destination chains
3. Enter amount and complete the bridge

## Architecture

- **Frontend**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with custom theme variables
- **Wallet Integration**: Wagmi + Viem for Ethereum interactions
- **Farcaster Integration**: Custom provider with Warpcast API support
- **UI Components**: Custom component library with Farcaster-specific elements

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | OnchainKit API key | Yes |
| `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` | Project name for MiniKit | Yes |
| `NEXT_PUBLIC_ICON_URL` | Logo URL for the app | Yes |
| `NEXT_PUBLIC_NEYNAR_API_KEY` | Neynar API key for enhanced Farcaster data | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [Base documentation](https://docs.base.org/)
- Visit [OnchainKit docs](https://onchainkit.xyz/)
- Join the [Base Discord](https://discord.gg/buildonbase)
