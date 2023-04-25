import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const dclController = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.DCLController,
    address: '0x6ff05b6271bbed8f16a46e6073d27ad94224e0ac',
    name: 'DCLController',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.DCLController,
    address: '0x6843291bd86857d97f0d269e698939fb10d60772',
    name: 'DCLController',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
