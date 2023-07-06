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
  [ChainId.MATIC_MAINNET]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x02080031b45a3c67d338dd4a2cc309d28756a160',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x5424912699dabaa5f2998750c1c66e73d67ad219',
    name: 'Decentraland Marketplace',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x5d01fbd3e22892be40f69bdae7ad921c8cda2085',
    name: 'Decentraland Marketplace',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0xccf0c17da6cd68041b1bf0f7e015767242077d8c',
    name: 'Decentraland Marketplace',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539',
    name: 'Decentraland Marketplace',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
