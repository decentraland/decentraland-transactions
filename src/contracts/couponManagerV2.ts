import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

/**
 * The coupon manager wired into OffChainMarketplaceV2 (`couponManager()` on that contract).
 *
 * Polygon only. Ethereum's V2 marketplace reports the zero address, so it never had one. Amoy's V2
 * does have one, but at the same address as the Polygon mainnet V2 marketplace (`0xa40b1d12…`), and
 * `getContractName` resolves addresses without a chain, so listing it here would make that address
 * ambiguous; nothing redeems V2 coupons on Amoy.
 */
export const couponManagerV2 = {
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x3fd3056ee72a2a85e9392fab3a450e7736536081',
    name: 'CouponManager',
    chainId: ChainId.MATIC_MAINNET
  }
}
