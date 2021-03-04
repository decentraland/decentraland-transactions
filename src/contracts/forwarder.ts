import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const forwarder = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.Forwarder,
    address: '0xe11663Feb948892F2d2D966bFCB40ba2F5C02Bb5',
    name: 'Forwarder',
    chainId: ChainId.MATIC_MUMBAI
  }
}
