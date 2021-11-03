import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const thirdPartyRegistry = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ThirdPartyRegistry,
    address: '0xc6349360cf0143bf54fdc376060532c044883b8c',
    name: 'Decentraland Third Party Registry',
    chainId: ChainId.MATIC_MUMBAI
  }
}
