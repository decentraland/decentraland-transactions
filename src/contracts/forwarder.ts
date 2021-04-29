import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const forwarder = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Forwarder,
    address: '0x0053e887b0F73e3aED2973968d5e85F33d305cbD',
    name: 'Forwarder',
    chainId: ChainId.MATIC_MUMBAI
  }
}
