import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const marketplace = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0x4D005B77334E36cD53843e9bABDf10340862C7f2',
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
  }
}
