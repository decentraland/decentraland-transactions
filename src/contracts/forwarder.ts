import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const forwarder = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Forwarder,
    address: '0x71e56Ad57eca3fAAe5077b7F9ea731a25785fF92',
    name: 'Forwarder',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.Forwarder,
    address: '0xBF6755A83C0dCDBB2933A96EA778E00b717d7004',
    name: 'Forwarder',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '2',
    abi: abis.Forwarder,
    address: '0x7b1fe9de545b22cb553766817b84d655ce8121c9',
    name: 'Forwarder',
    chainId: ChainId.MATIC_AMOY
  }
}
