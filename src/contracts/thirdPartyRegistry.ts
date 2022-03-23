import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const thirdPartyRegistry = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.ThirdPartyRegistry,
    address: '0x640969Bfa2feA201Aeb9f482E5DdddC25586e82c',
    name: 'Decentraland Third Party Registry',
    chainId: ChainId.MATIC_MUMBAI
  }
}
