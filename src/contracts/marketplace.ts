import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const marketplace = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x2a09a000224f5dbe0E17214cA95CDe506DA7CB74',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x5424912699dabaa5f2998750c1c66e73d67ad219',
    name: 'Decentraland Marketplace',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539',
    name: 'Decentraland Marketplace',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x02080031b45A3c67d338Dd4A2CC309D28756A160',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MAINNET
  }
}
