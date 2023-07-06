import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const dclRegistrar = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1',
    abi: abis.DCLRegistrar,
    address: '0x7518456ae93eb98f3e64571b689c626616bb7f30',
    name: 'DCLRegistrar',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.DCLRegistrar,
    address: '0x2a187453064356c898cae034eaed119e1663acb8',
    name: 'DCLRegistrar',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
