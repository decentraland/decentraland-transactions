import { ChainId } from '@dcl/schemas'
import { abis } from '../abis'

/** The coupon manager wired into OffChainMarketplaceV3 (`couponManager()` on that contract). */
export const couponManagerV3 = {
  [ChainId.ETHEREUM_MAINNET]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0xf9180eed9fcd5f8b3921c1b8caeb771c10faeb26',
    name: 'CouponManager',
    chainId: ChainId.ETHEREUM_MAINNET
  },
  [ChainId.ETHEREUM_SEPOLIA]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0xed558211ae5ae57a6704423918cb9b8501051af0',
    name: 'CouponManager',
    chainId: ChainId.ETHEREUM_SEPOLIA
  },
  [ChainId.MATIC_MAINNET]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x655fdfa91d69ea49f4ce1a8f7f7e2622c8630813',
    name: 'CouponManager',
    chainId: ChainId.MATIC_MAINNET
  },
  [ChainId.MATIC_AMOY]: {
    version: '1.0.0',
    abi: abis.CouponManager,
    address: '0x6c956587d9fe70032781edcdc626310648575382',
    name: 'CouponManager',
    chainId: ChainId.MATIC_AMOY
  }
}
