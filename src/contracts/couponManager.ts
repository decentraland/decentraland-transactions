import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

/**
 * @deprecated Ambiguous: this name means the manager wired into OffChainMarketplaceV2 on Polygon
 * mainnet, but the one wired into OffChainMarketplaceV3 on the testnets. A coupon is only redeemable on
 * the marketplace whose manager signed it, so resolve the manager from the marketplace with
 * `getCouponManager(marketplace, chainId)`, or name the version: CouponManagerV2 / CouponManagerV3.
 * Kept as it is so existing callers keep resolving what they resolve today.
 */
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
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x3fd3056ee72a2a85e9392fab3a450e7736536081',
    name: 'CouponManager',
    chainId: ChainId.MATIC_MAINNET
  }
}
