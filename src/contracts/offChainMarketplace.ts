import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplace = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace,
    address: '0xb901e30251CDb9CFaD2dDD4FDb4798D5B4312C69',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace,
    address: '0xaF31A4620B95175C0F5ad6e968D77E7D1d3dd2A9',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_AMOY
  }
}
