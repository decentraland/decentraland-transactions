import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const bid = {
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: '1',
    abi: abis.Bid,
    address: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    name: 'Decentraland Bid',
    chainId: ChainId.ETHEREUM_ROPSTEN
  },
  [ChainId.ETHEREUM_GOERLI]: {
    version: '1',
    abi: abis.Bid,
    address: '0xd7dc1c183b8ffaed6b7f30ffc616ff81b66812e5',
    name: 'Decentraland Bid',
    chainId: ChainId.ETHEREUM_GOERLI
  },
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1',
    abi: abis.Bid,
    address: '0x2c2835b95852fd975e087b3b25297322728792e2',
    name: 'Decentraland Bid',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1',
    abi: abis.Bid,
    address: '0xe479dfd9664c693b2e2992300930b00bfde08233',
    name: 'Decentraland Bid',
    chainId: ChainId.ETHEREUM_MAINNET
  }
}
