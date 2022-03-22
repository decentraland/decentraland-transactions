import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const thirdPartyRegistry = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ThirdPartyRegistry,
    address: '0x57D5aDDE329C6D201Fcf674915AfF7bb7242C287',
    name: 'Decentraland Third Party Registry',
    chainId: ChainId.MATIC_MUMBAI
  }
}
