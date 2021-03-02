import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const marketplaceContract = {
  [ChainId.MATIC_MUMBAI]: {
    version: '1',
    abi: abis.Marketplace,
    address: '0xa274eC4366703d31bF58F5053b708335FaAC2b52',
    name: 'Decentraland Marketplace',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    abi: abis.Marketplace,
    address: '0x5424912699dabaa5f2998750c1c66e73d67ad219'
  },
  [ChainId.ETHEREUM_MAINNET]: {
    abi: abis.Marketplace,
    address: '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539',
  }
}
