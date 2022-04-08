import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const thirdPartyRegistry = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ThirdPartyRegistry,
    address: '0xEDf516F2D42A47F9cE0B145Fe0dbB76975379889',
    name: 'Decentraland Third Party Registry',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.ThirdPartyRegistry,
    address: '0x1C436C1EFb4608dFfDC8bace99d2B03c314f3348',
    name: 'Decentraland Third Party Registry',
    chainId: ChainId.MATIC_MAINNET
  }
}
