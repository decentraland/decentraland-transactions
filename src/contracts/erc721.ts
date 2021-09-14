import { ChainId } from '@dcl/schemas'
import { ContractData } from '../types'
import { abis } from '../abis'

export const erc721: Record<ChainId, ContractData> = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_RINKEBY]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.ETHEREUM_RINKEBY
  },
  [ChainId.ETHEREUM_KOVAN]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.ETHEREUM_KOVAN
  },
  [ChainId.ETHEREUM_GOERLI]: {
    version: '2',
    abi: abis.ERC721,
    address: '',
    name: 'ERC271',
    chainId: ChainId.ETHEREUM_GOERLI
  }
}
