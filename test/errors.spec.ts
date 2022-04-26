import { ChainId } from '@dcl/schemas'
import { expect } from 'chai'
import { fake } from 'sinon'
import { ErrorCode, MetaTransactionError, sendMetaTransaction } from '../src'
import { getConfiguration } from '../src/configuration'

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

    describe('Fetch error code', () => {
      let fullFakeProvider: { request: ({ method }: { method: string }) => any }

      beforeEach(() => {
        ;(global as any).fetch = async (url: string) => {
          if (url === getConfiguration().serverURL + '/transactions') {
            return {
              ok: true,
              json: async () => ({
                ok: false,
                message:
                  "The transaction data contains a sale price that's lower than the allowed minimum. Sale price: 0.1 - Minimum price: 1",
                code: ErrorCode.SALE_PRICE_TOO_LOW
              })
            }
          }
        }

        fullFakeProvider = {
          request: ({ method }) => {
            switch (method) {
              case 'eth_requestAccounts':
                return ['0xdeadbeef'] as any
              case 'eth_getCode':
                return '0x0'
              case 'eth_call':
                return '0x1'
              case 'eth_signTypedData_v4':
                return '0x81281be80000000000000000000000005c8bf33e673dc712ba62c5459e59dd9a15d458ff000000000000000000000000000000000000000000000000000000000000000b0000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000026adcc'
              default:
                return fake()
            }
          }
        }
      })

      it('should throw with the received error code if the server errors out', async () => {
        const promise = sendMetaTransaction(
          fullFakeProvider,
          fullFakeProvider,
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
        expect(error.code).to.be.equal(ErrorCode.SALE_PRICE_TOO_LOW)
      })
    })
  })
})
