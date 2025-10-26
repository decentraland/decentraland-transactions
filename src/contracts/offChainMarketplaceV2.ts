import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplaceV2 = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.ETHEREUM,
    address: '0x1b67d0e31eeb6b52d8eeed71d3616c2f5b33b8e7',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.ETHEREUM,
    address: '0x1b67d0e31eeb6b52d8eeed71d3616c2f5b33b8e7',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.MATIC,
    address: '0x1b67d0e31eeb6b52d8eeed71d3616c2f5b33b8e7',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_AMOY
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.MATIC,
    address: '0xa40b1d129b8906888720686f3a01921ddf37716f',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_MAINNET
  }
}
