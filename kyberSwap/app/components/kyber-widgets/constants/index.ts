export enum ZIndex {
  UNDERLAYER = -1,
  OVERLAY = 100,
  DIALOG = 1000,
  TOOLTIP = 2000,
}

export const NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

export interface TokenInfo {
  name: string
  symbol: string
  address: string
  decimals: number
  logoURI: string
  chainId: number
  isImport?: boolean
}

const eth = (chainId: number) => ({
  name: 'Ether',
  decimals: 18,
  symbol: 'ETH',
  address: NATIVE_TOKEN_ADDRESS,
  chainId: chainId,
  logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
})

export const NATIVE_TOKEN: {
  [chainId: number]: TokenInfo
} = {
  1: eth(1),
  137: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 137,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  },
  56: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 56,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  },
  43114: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 43114,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  },
  250: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 250,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png',
  },
  25: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 25,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png',
  },
  42161: eth(42161),
  199: {
    name: 'BTT',
    symbol: 'BTT',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 199,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16086.png',
  },
  10: eth(10),
  59144: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 59144,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  1101: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 1101,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  324: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 324,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  8453: eth(8453),
  81457: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 81457,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  5000: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 5000,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/27075.png',
  },
  80094: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 80094,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28744.png',
  },
  146: {
    name: 'XRD',
    symbol: 'XRD',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 146,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29495.png',
  },
}

export const SCAN_LINK: { [chainId: number]: string } = {
  1: 'https://etherscan.io',
  137: 'https://polygonscan.com',
  56: 'https://bscscan.com',
  43114: 'https://snowtrace.io',
  250: 'https://ftmscan.com',
  25: 'https://cronoscan.com',
  42161: 'https://arbiscan.io',
  199: 'https://bttcscan.com',
  10: 'https://optimistic.etherscan.io',
  59144: 'https://lineascan.build',
  1101: 'https://zkevm.polygonscan.com',
  324: 'https://explorer.zksync.io',
  8453: 'https://basescan.org',
  81457: 'https://blastscan.io',
  5000: 'https://explorer.mantle.xyz',
  80094: 'https://berascan.com',
  146: 'https://sonicscan.org',
}

export const SUPPORTED_NETWORKS = Object.keys(SCAN_LINK)
