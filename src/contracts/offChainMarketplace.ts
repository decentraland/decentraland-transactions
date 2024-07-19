import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplace = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.ETHEREUM,
    address: '0x868BD98613a5C7f6e67C23BD0A4b14E4663ACF71',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.MATIC,
    address: '0xeeaf5d2dd4b8930039770285aa9be2cf6a9836b4',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_AMOY
  }
}
