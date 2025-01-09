import { expect } from 'chai'
import { ethers } from 'ethers'
import * as sinon from 'sinon'
import { AxelarProvider } from '../src/crossChain/AxelarProvider'
import { ERC20 } from '../src/abis/ERC20'
import { Provider } from 'decentraland-connect'
import { TransactionResponses } from '@0xsquid/sdk/dist/types'

describe('AxelarProvider', () => {
  let provider: AxelarProvider
  let ethersRef: typeof ethers
  let mockProvider: Provider

  beforeEach(() => {
    provider = new AxelarProvider('https://testapi.squid.com')
    ethersRef = ethers

    // Create a minimal mock provider that satisfies the Provider interface
    mockProvider = ({
      request: async () => ({}),
      send: async () => ({}),
      sendAsync: async () => ({}),
      isMetamask: true,
      addListener: () => mockProvider,
      removeListener: () => mockProvider,
      on: () => mockProvider,
      once: () => mockProvider,
      off: () => mockProvider,
      emit: () => false,
      listenerCount: () => 0,
      listeners: () => [],
      removeAllListeners: () => mockProvider,
      isMetaMask: true,
      isDapper: false,
      isFortmatic: false,
      isFrame: false,
      isTokenPocket: false,
      isTrust: false,
      isWalletConnect: false,
      isCoinbaseWallet: false,
      isImToken: false,
      isBitKeep: false,
      isBlockWallet: false,
      isBraveWallet: false,
      isPhantom: false,
      isAvalanche: false,
      isGamestop: false,
      isOKXWallet: false,
      isPortal: false,
      isRabby: false,
      isZerion: false
    } as unknown) as Provider
  })

  afterEach(() => {
    sinon.restore()
    // @ts-ignore - Restore ethers reference
    ethers = ethersRef
  })

  describe('when initializing the provider', () => {
    it('should create a squid instance with the provided URL', () => {
      expect(provider.squid).to.exist
      expect(provider.initialized).to.be.false
    })
  })

  describe('when creating an interface', () => {
    describe('and using ethers v6', () => {
      const mockEthers = {
        Interface: {
          from: sinon.stub().returns({ mockInterface: true })
        }
      }

      beforeEach(() => {
        // @ts-ignore - Mocking ethers
        ethers = mockEthers
      })

      it('should create the interface using v6 syntax', () => {
        const result = (provider as any)._createInterface(ERC20)
        expect(result).to.deep.equal({ mockInterface: true })
        expect(mockEthers.Interface.from.called).to.be.true
      })
    })

    describe('and using ethers v5', () => {
      describe('and v6 syntax fails', () => {
        const mockEthers = {
          Interface: {
            from: sinon.stub().throws(new Error('v6 not supported'))
          },
          utils: {
            Interface: sinon.stub().returns({ mockInterface: true })
          }
        }

        beforeEach(() => {
          // @ts-ignore - Mocking ethers
          ethers = mockEthers
        })

        it('should fall back to v5 syntax', () => {
          const result = (provider as any)._createInterface(ERC20)
          expect(result).to.deep.equal({ mockInterface: true })
          expect(mockEthers.utils.Interface.called).to.be.true
        })
      })

      describe('and both v5 and v6 syntax fail', () => {
        const mockEthers = {
          Interface: {
            from: sinon.stub().throws(new Error('v6 not supported'))
          },
          utils: {
            Interface: sinon.stub().throws(new Error('v5 not supported'))
          }
        }

        beforeEach(() => {
          // @ts-ignore - Mocking ethers
          ethers = mockEthers
        })

        it('should throw an error', () => {
          expect(() => (provider as any)._createInterface(ERC20)).to.throw()
        })
      })
    })
  })

  describe('when creating a Web3Provider', () => {
    describe('and using ethers v6', () => {
      const mockEthers = {
        BrowserProvider: sinon.stub().returns({ mockProvider: true })
      }

      beforeEach(() => {
        // @ts-ignore - Mocking ethers
        ethers = mockEthers
      })

      it('should create the provider using v6 syntax', () => {
        const result = (provider as any)._createWeb3Provider(mockProvider)
        expect(result).to.deep.equal({ mockProvider: true })
        expect(mockEthers.BrowserProvider.called).to.be.true
      })
    })

    describe('and using ethers v5', () => {
      describe('and v6 syntax fails', () => {
        const mockEthers = {
          BrowserProvider: sinon.stub().throws(new Error('v6 not supported')),
          providers: {
            Web3Provider: sinon.stub().returns({ mockProvider: true })
          }
        }

        beforeEach(() => {
          // @ts-ignore - Mocking ethers
          ethers = mockEthers
        })

        it('should fall back to v5 syntax', () => {
          const result = (provider as any)._createWeb3Provider(mockProvider)
          expect(result).to.deep.equal({ mockProvider: true })
          expect(mockEthers.providers.Web3Provider.called).to.be.true
        })
      })

      describe('and both v5 and v6 syntax fail', () => {
        const mockEthers = {
          BrowserProvider: sinon.stub().throws(new Error('v6 not supported')),
          providers: {
            Web3Provider: sinon.stub().throws(new Error('v5 not supported'))
          }
        }

        beforeEach(() => {
          // @ts-ignore - Mocking ethers
          ethers = mockEthers
        })

        it('should throw an error', () => {
          expect(() =>
            (provider as any)._createWeb3Provider(mockProvider)
          ).to.throw()
        })
      })
    })
  })

  describe('when executing a route', () => {
    let mockTxResponse: TransactionResponses
    let mockSigner: any
    let mockWeb3Provider: any
    let mockRoute: any

    beforeEach(() => {
      mockSigner = { mockSigner: true }
      mockTxResponse = ({
        hash: '0x123',
        confirmations: 1,
        from: '0x123',
        nonce: 1,
        gasLimit: ethers.BigNumber.from(1),
        gasPrice: ethers.BigNumber.from(1),
        data: '0x',
        value: ethers.BigNumber.from(0),
        chainId: 1,
        provider: {} as any,
        blockNumber: 1,
        blockHash: '0x123',
        timestamp: 1,
        index: 0,
        type: 0,
        signature: {} as any,
        accessList: [],
        maxPriorityFeePerGas: ethers.BigNumber.from(1),
        maxFeePerGas: ethers.BigNumber.from(1),
        raw: '0x',
        r: '0x',
        s: '0x',
        v: 1,
        creates: null,
        networkId: 1
      } as unknown) as TransactionResponses

      // @ts-ignore - Adding wait method for compatibility
      mockTxResponse.wait = sinon.stub().resolves({ transactionHash: '0x123' })

      mockWeb3Provider = {
        getSigner: sinon.stub().resolves(mockSigner)
      }

      mockRoute = {
        route: { mockRoute: true }
      }
    })

    describe('and squid is initialized', () => {
      beforeEach(() => {
        provider.initialized = true
        sinon
          .stub(provider as any, '_createWeb3Provider')
          .returns(mockWeb3Provider)
        sinon.stub(provider.squid, 'executeRoute').resolves(mockTxResponse)
      })

      it('should execute the route and return the transaction hash', async () => {
        const result = await provider.executeRoute(mockRoute, mockProvider)
        expect(result).to.deep.equal({ transactionHash: '0x123' })
        expect(mockWeb3Provider.getSigner.called).to.be.true
      })
    })

    describe('and squid is not initialized', () => {
      let initStub: sinon.SinonStub

      beforeEach(() => {
        provider.initialized = false
        sinon
          .stub(provider as any, '_createWeb3Provider')
          .returns(mockWeb3Provider)
        sinon.stub(provider.squid, 'executeRoute').resolves(mockTxResponse)
        initStub = sinon.stub(provider.squid, 'init')
      })

      it('should initialize squid before executing the route', async () => {
        const result = await provider.executeRoute(mockRoute, mockProvider)
        expect(result).to.deep.equal({ transactionHash: '0x123' })
        sinon.assert.calledOnce(initStub)
      })
    })

    describe('and the transaction fails', () => {
      beforeEach(() => {
        provider.initialized = true
        sinon
          .stub(provider as any, '_createWeb3Provider')
          .returns(mockWeb3Provider)
        sinon.stub(provider.squid, 'executeRoute').resolves(mockTxResponse)
        // @ts-ignore - Modifying wait method
        mockTxResponse.wait = sinon
          .stub()
          .rejects(new Error('Transaction failed'))
      })

      it('should throw an error with the failure message', async () => {
        try {
          await provider.executeRoute(mockRoute, mockProvider)
          expect.fail('Should have thrown an error')
        } catch (error) {
          expect(error.message).to.equal('Transaction failed')
        }
      })
    })
  })
})
