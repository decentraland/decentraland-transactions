import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

/**
 * The coupon manager wired into OffChainMarketplaceV2, kept addressable after {@link couponManager}
 * moved to the one V3 points at.
 *
 * It exists so the registry stays reversible: `getContractName` resolves an address by scanning every
 * entry, so dropping this one would make a manager that has been live on Polygon mainnet for months
 * unnameable — and callers still settling a V2-era coupon need a way to ask for it by name rather than
 * receiving V3's silently.
 *
 * Polygon only. Ethereum's V2 marketplace reports `couponManager()` as the zero address, so it never had
 * one to preserve.
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
