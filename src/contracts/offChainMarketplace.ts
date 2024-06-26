import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplace = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1',
    abi: abis.OffChainMarketplace,
    address: '0xb901e30251CDb9CFaD2dDD4FDb4798D5B4312C69',
    name: 'Decentraland Off Chain Marketplace',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
}
