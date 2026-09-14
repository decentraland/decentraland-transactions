import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

/**
 * The coupon manager wired into OffChainMarketplaceV2 (`couponManager()` on that contract).
 * Polygon only: Ethereum's V2 marketplace reports the zero address. The Amoy address is also the
 * Polygon mainnet V2 marketplace's, so `getContractName` keeps resolving it to the marketplace.
 */
export const couponManagerV2 = {
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x3fd3056ee72a2a85e9392fab3a450e7736536081',
    name: 'CouponManager',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0xa40b1d129b8906888720686f3a01921ddf37716f',
    name: 'CouponManager',
    chainId: ChainId.MATIC_AMOY
  }
}
