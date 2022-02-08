import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const thirdPartyRegistry = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ThirdPartyRegistry,
    address: '0x83cB8cd93698c0726AF6b5497540C9A1B410fFA2',
    name: 'Decentraland Third Party Registry',
    chainId: ChainId.MATIC_MUMBAI
  }
}
