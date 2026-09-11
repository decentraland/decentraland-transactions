import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

export const couponManager = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0xed558211ae5ae57a6704423918cb9b8501051af0',
    name: 'CouponManager',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x6c956587d9fe70032781edcdc626310648575382',
    name: 'CouponManager',
    chainId: ChainId.MATIC_AMOY
  },
  // The manager wired into the Polygon mainnet off-chain marketplace (OffChainMarketplaceV2). Amoy's is
  // wired into V3 there instead, so the two chains pair a coupon manager with a different marketplace.
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x3fd3056ee72a2a85e9392fab3a450e7736536081',
    name: 'CouponManager',
    chainId: ChainId.MATIC_MAINNET
  }
}
