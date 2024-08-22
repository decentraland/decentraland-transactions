import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const offChainMarketplace = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.ETHEREUM,
    address: '0x347ECe82D01A2e7371fD3c1d2F6D4e85029B863f',
    name: 'DecentralandMarketplaceEthereum',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.OffChainMarketplace.MATIC,
    address: '0x55f4d82b0f6a105b9f1959f10a660a4395d755ab',
    name: 'DecentralandMarketplacePolygon',
    chainId: ChainId.MATIC_AMOY
  }
}
