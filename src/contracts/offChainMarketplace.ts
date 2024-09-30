import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplace = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.ETHEREUM,
    address: '0x54bdd3ffc1448bdab0251f05dd554eec803adb2f',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.ETHEREUM,
    address: '0x2d6b3508f9aca32d2550f92b2addba932e73c1ff',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.MATIC,
    address: '0x6ab20ae56673ed65f520b7be332aeb61b3ed727d',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_AMOY
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.MATIC,
    address: '0x540fb08eDb56AaE562864B390542C97F562825BA',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_MAINNET
  }
}
