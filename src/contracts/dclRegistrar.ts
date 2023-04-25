import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const dclRegistrar = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.DCLRegistrar,
    address: '0x6b8da2752827cf926215b43bb8e46fd7b9ddac35',
    name: 'DCLRegistrar',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.DCLRegistrar,
    address: '0x2a187453064356c898cae034eaed119e1663acb8',
    name: 'DCLRegistrar',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
