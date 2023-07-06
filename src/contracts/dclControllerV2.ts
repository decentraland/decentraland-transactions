import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const dclControllerV2 = {
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.DCLControllerV2,
    address: '0xe23b047c8ee33d0c423676544bca6d2c9d3faa49',
    name: 'DCLControllerV2',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1',
    abi: abis.DCLControllerV2,
    address: '0xd2046364317c21fa8d121d84185c39e6e910cf89',
    name: 'DCLControllerV2',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.DCLControllerV2,
    address: '0xbe92b49aee993adea3a002adcda189a2b7dec56c',
    name: 'DCLControllerV2',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
