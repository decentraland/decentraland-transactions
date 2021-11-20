import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const marketplaceV2 = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Marketplace,
    address: '0x4e9c83F65dB67a6493d390f16C657e3e1dE37636',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MUMBAI
  }
}
