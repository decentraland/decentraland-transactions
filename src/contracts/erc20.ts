import { ChainId } from '@dcl/schemas'
import { ContractData } from '../types'
import { abis } from '../abis'

export const erc20: Record<ChainId, ContractData> = {
  [ChainId.MATIC_MUMBAI]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.MATIC_MUMBAI
  },
  [ChainId.MATIC_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_RINKEBY]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ETHEREUM_RINKEBY
  },
  [ChainId.ETHEREUM_KOVAN]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ETHEREUM_KOVAN
  },
  [ChainId.ETHEREUM_GOERLI]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ARBITRUM_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.ARBITRUM_MAINNET
  },
  [ChainId.OPTIMISM_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.OPTIMISM_MAINNET
  },
  [ChainId.AVALANCHE_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.AVALANCHE_MAINNET
  },
  [ChainId.BSC_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.BSC_MAINNET
  },
  [ChainId.FANTOM_MAINNET]: {
    version: '2',
    abi: abis.ERC20,
    address: '',
    name: 'ERC20',
    chainId: ChainId.FANTOM_MAINNET
  }
}
