import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplaceV3 = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplaceV3.ETHEREUM,
    address: '0x257db44ac97789c16ab277eae87dcde0c246cc9f',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplaceV3.MATIC,
    address: '0x36fd1434a6c4b8ade80c9847c1d15033ce34488c',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_AMOY
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplaceV3.ETHEREUM,
    address: '0x0f11d0d1671519683bd48abf3dbe779e300941cd',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplaceV3.MATIC,
    address: '0xe38ef22abe871513555cba89adfe45ab4f548ada',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_MAINNET
  }
}
