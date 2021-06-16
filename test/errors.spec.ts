import { ChainId } from '@dcl/schemas'
import { expect } from 'chai'
import { fake } from 'sinon'
import { ErrorCode, MetaTransactionError, sendMetaTransaction } from '../src'

async function getError<T extends Error>(
  promise: Promise<any>
): Promise<T | null> {
  try {
    await promise
  } catch (error) {
    return error
  }
  return null
}

describe('#Errors', () => {
  describe('Invalid address', () => {
    it('should throw if address is empty', async () => {
      const fakeProvider = {
        request: fake()
      }
      const fakeMetaTransactionProvider = {
        request: fake()
      }
      const promise = sendMetaTransaction(
        fakeProvider,
        fakeMetaTransactionProvider,
        '0x',
        {
          name: 'Fake Contract',
          address: '', // empty address
          chainId: ChainId.MATIC_MAINNET,
          version: '1',
          abi: []
        }
      )
      const error = await getError<MetaTransactionError>(promise)
      expect(error).to.be.instanceOf(MetaTransactionError)
      expect(error.code).to.be.equal(ErrorCode.INVALID_ADDRESS)
    })
    describe('Contract account', () => {
      it('should throw if bytecode is non-zero', async () => {
        const fakeProvider = {
          request: fake.returns('0x1') // returns non-zero bytecode
        }
        const fakeMetaTransactionProvider = {
          request: fake()
        }
        const promise = sendMetaTransaction(
          fakeProvider,
          fakeMetaTransactionProvider,
          '0x',
          {
            name: 'Fake Contract',
            address: '0xcafebabe',
            chainId: ChainId.MATIC_MAINNET,
            version: '1',
            abi: []
          }
        )
        const error = await getError<MetaTransactionError>(promise)
        expect(error).to.be.instanceOf(MetaTransactionError)
        expect(error.code).to.be.equal(ErrorCode.CONTRACT_ACCOUNT)
      })
    })
    describe('User denied', () => {
      it('should throw if user rejects transaction', async () => {
        const fakeProvider = {
          request: fake.throws(new Error('User denied message signature'))
        }
        const fakeMetaTransactionProvider = {
          request: fake()
        }
        const promise = sendMetaTransaction(
          fakeProvider,
          fakeMetaTransactionProvider,
          '0x',
          {
            name: 'Fake Contract',
            address: '0xcafebabe',
            chainId: ChainId.MATIC_MAINNET,
            version: '1',
            abi: []
          }
        )
        const error = await getError<MetaTransactionError>(promise)
        expect(error).to.be.instanceOf(MetaTransactionError)
        expect(error.code).to.be.equal(ErrorCode.USER_DENIED)
      })
    })
  })
})
