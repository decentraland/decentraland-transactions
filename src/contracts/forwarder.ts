import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const forwarder = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Forwarder,
    address: '0x71e56Ad57eca3fAAe5077b7F9ea731a25785fF92',
    name: 'Forwarder',
    chainId: ChainId.MATIC_MUMBAI
  }
}
