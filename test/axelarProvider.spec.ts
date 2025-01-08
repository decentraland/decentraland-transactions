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

  beforeEach(() => {
    provider = new AxelarProvider('https://testapi.squid.com')
    ethersRef = ethers
  })

  afterEach(() => {
    sinon.restore()
    // @ts-ignore - Restore ethers reference
    ethers = ethersRef
  })

  describe('Interface Creation', () => {
    it('should create interface using ethers v6 syntax', () => {
      // Mock ethers v6-like environment
      const mockEthers = {
        Interface: {
          from: sinon.stub().returns({ mockInterface: true })
        }
      }
      // @ts-ignore - Mocking ethers
      ethers = mockEthers

      // Call the function directly from the module
      const result = (provider as any)._createInterface(ERC20)
      expect(result).to.deep.equal({ mockInterface: true })
      expect(mockEthers.Interface.from.called).to.be.true
    })

    it('should fall back to ethers v5 syntax if v6 fails', () => {
      // Mock ethers v5-like environment
      const mockEthers = {
        Interface: {
          from: sinon.stub().throws(new Error('v6 not supported'))
        },
        utils: {
          Interface: sinon.stub().returns({ mockInterface: true })
        }
      }
      // @ts-ignore - Mocking ethers
      ethers = mockEthers

      const result = (provider as any)._createInterface(ERC20)
      expect(result).to.deep.equal({ mockInterface: true })
      expect(mockEthers.utils.Interface.called).to.be.true
    })

    it('should throw error if both v5 and v6 syntax fail', () => {
      // Mock failed ethers environment
      const mockEthers = {
        Interface: {
          from: sinon.stub().throws(new Error('v6 not supported'))
        },
        utils: {
          Interface: sinon.stub().throws(new Error('v5 not supported'))
        }
      }
      // @ts-ignore - Mocking ethers
      ethers = mockEthers

      expect(() => (provider as any)._createInterface(ERC20)).to.throw()
    })
  })

  describe('Web3Provider Creation', () => {
    // Create a minimal mock provider that satisfies the Provider interface
    const mockProvider = ({
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

    it('should create provider using ethers v6 syntax', () => {
      // Mock ethers v6-like environment
      const mockEthers = {
        BrowserProvider: sinon.stub().returns({ mockProvider: true })
      }
      // @ts-ignore - Mocking ethers
      ethers = mockEthers

      const result = (provider as any)._createWeb3Provider(mockProvider)
      expect(result).to.deep.equal({ mockProvider: true })
      expect(mockEthers.BrowserProvider.called).to.be.true
    })

    it('should fall back to ethers v5 syntax if v6 fails', () => {
      // Mock ethers v5-like environment
      const mockEthers = {
        BrowserProvider: sinon.stub().throws(new Error('v6 not supported')),
        providers: {
          Web3Provider: sinon.stub().returns({ mockProvider: true })
        }
      }
      // @ts-ignore - Mocking ethers
      ethers = mockEthers

      const result = (provider as any)._createWeb3Provider(mockProvider)
      expect(result).to.deep.equal({ mockProvider: true })
      expect(mockEthers.providers.Web3Provider.called).to.be.true
    })

    it('should throw error if both v5 and v6 syntax fail', () => {
      // Mock failed ethers environment
      const mockEthers = {
        BrowserProvider: sinon.stub().throws(new Error('v6 not supported')),
        providers: {
          Web3Provider: sinon.stub().throws(new Error('v5 not supported'))
        }
      }
      // @ts-ignore - Mocking ethers
      ethers = mockEthers

      expect(() =>
        (provider as any)._createWeb3Provider(mockProvider)
      ).to.throw()
    })
  })

  describe('executeRoute', () => {
    // Reuse the same mock provider from above
    const mockProvider = ({
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

    const mockRoute = {
      route: { mockRoute: true }
    }

    it('should execute route with ethers v6 provider', async () => {
      const mockSigner = { mockSigner: true }
      const mockTxResponse = ({
        hash: '0x123',
        confirmations: 1,
        from: '0x123',
        wait: sinon.stub().resolves({ transactionHash: '0x123' }),
        nonce: 1,
        gasLimit: ethers.BigNumber.from(1),
        gasPrice: ethers.BigNumber.from(1),
        data: '0x',
        value: ethers.BigNumber.from(0),
        chainId: 1,
        // Add required properties for TransactionResponses
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

      const mockWeb3Provider = {
        getSigner: sinon.stub().resolves(mockSigner)
      }

      // Mock provider creation and squid execution
      sinon
        .stub(provider as any, '_createWeb3Provider')
        .returns(mockWeb3Provider)
      const executeRouteStub = sinon.stub(provider.squid, 'executeRoute')
      executeRouteStub.resolves(mockTxResponse)
      provider.initialized = true

      const result = await provider.executeRoute(mockRoute as any, mockProvider)
      expect(result).to.deep.equal({ transactionHash: '0x123' })
      expect(mockWeb3Provider.getSigner.called).to.be.true
      expect(executeRouteStub.called).to.be.true
    })

    it('should initialize squid if not initialized', async () => {
      const mockSigner = { mockSigner: true }
      const mockTxResponse = ({
        hash: '0x123',
        confirmations: 1,
        from: '0x123',
        wait: sinon.stub().resolves({ transactionHash: '0x123' }),
        nonce: 1,
        gasLimit: ethers.BigNumber.from(1),
        gasPrice: ethers.BigNumber.from(1),
        data: '0x',
        value: ethers.BigNumber.from(0),
        chainId: 1,
        // Add required properties for TransactionResponses
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

      const mockWeb3Provider = {
        getSigner: sinon.stub().resolves(mockSigner)
      }

      // Mock provider creation and squid execution
      sinon
        .stub(provider as any, '_createWeb3Provider')
        .returns(mockWeb3Provider)
      const executeRouteStub = sinon.stub(provider.squid, 'executeRoute')
      executeRouteStub.resolves(mockTxResponse)
      const initStub = sinon.stub(provider.squid, 'init')
      provider.initialized = false

      const result = await provider.executeRoute(mockRoute as any, mockProvider)
      expect(result).to.deep.equal({ transactionHash: '0x123' })
      expect(initStub.called).to.be.true
    })

    it('should handle transaction wait errors', async () => {
      const mockSigner = { mockSigner: true }
      const mockTxResponse = ({
        hash: '0x123',
        confirmations: 1,
        from: '0x123',
        wait: sinon.stub().rejects(new Error('Transaction failed')),
        nonce: 1,
        gasLimit: ethers.BigNumber.from(1),
        gasPrice: ethers.BigNumber.from(1),
        data: '0x',
        value: ethers.BigNumber.from(0),
        chainId: 1,
        // Add required properties for TransactionResponses
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

      const mockWeb3Provider = {
        getSigner: sinon.stub().resolves(mockSigner)
      }

      // Mock provider creation and squid execution
      sinon
        .stub(provider as any, '_createWeb3Provider')
        .returns(mockWeb3Provider)
      const executeRouteStub = sinon.stub(provider.squid, 'executeRoute')
      executeRouteStub.resolves(mockTxResponse)
      provider.initialized = true

      try {
        await provider.executeRoute(mockRoute as any, mockProvider)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error.message).to.equal('Transaction failed')
      }
    })
  })
})
