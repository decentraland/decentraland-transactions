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
  }
}
