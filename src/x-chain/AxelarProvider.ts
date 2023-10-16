import ethers from 'ethers'
import { RouteResponse, Squid, SquidCallType } from '@0xsquid/sdk'
import { Provider } from 'decentraland-connect'
import { getContract } from '../contracts'
import { ContractName } from '../types'
import { ERC20 } from 'abis/ERC20'
import { MarketplaceV2 } from 'abis/MarketplaceV2'
import { ERC721 } from 'abis/ERC721'
import { XChainProvider } from './XChainProvider'
import { XChainCallData } from './types'

export class AxelarProvider implements XChainProvider {
  private squid: Squid
  private squidMulticall = '0x4fd39C9E151e50580779bd04B1f7eCc310079fd3' // Squid calling contract

  constructor() {
    // Initialize Squid SDK in the constructor
    this.squid = new Squid({
      baseUrl: 'https://api.squidrouter.com'
    })
  }

  async sendTransaction(
    provider: Provider,
    xChainCallData: XChainCallData
  ): Promise<string> {
    // const signer = await new ethers.providers.Web3Provider(provider).getSigner()
    const route = await this.getRoute(xChainCallData)
    const tx = await this.executeRoute(route, provider)
    console.log('tx: ', tx)
    return tx.transactionHash
  }

  private async getRoute(
    xChainCallData: XChainCallData
  ): Promise<RouteResponse> {
    const {
      fromAddress,
      fromAmount,
      fromChain,
      fromToken,
      toAddress,
      toChain,
      toAmount, // the item price
      toToken,
      enableExpress = true,
      slippage = 1,
      nft: { collectionAddress, price, tokenId }
    } = xChainCallData

    const ERC20ContractInterface = new ethers.utils.Interface(ERC20)
    const marketplaceInterface = new ethers.utils.Interface(MarketplaceV2)
    const ERC721ContractInterface = new ethers.utils.Interface(ERC721)

    const destinyChainMANA = getContract(ContractName.MarketplaceV2, toChain)
      .address
    const destinyChainMarketplaceV2 = getContract(
      ContractName.MarketplaceV2,
      toChain
    ).address

    return this.squid.getRoute({
      fromAddress,
      fromAmount,
      fromToken,
      fromChain,
      toToken,
      toChain,
      toAddress,
      //   toAmount, // the price
      enableExpress,
      slippage,

      customContractCalls: [
        // ===================================
        // Approve MANA to be spent by Decentraland contract
        // ===================================
        {
          callType: SquidCallType.FULL_TOKEN_BALANCE,
          target: destinyChainMANA,
          value: '0',
          callData: ERC20ContractInterface.encodeFunctionData('approve', [
            // config.decentralandBuyAddress,
            getContract(ContractName.MarketplaceV2, toChain).address,
            toAmount
            // config.item.price
          ]),
          payload: {
            tokenAddress: destinyChainMarketplaceV2,
            inputPos: 1
          },
          estimatedGas: '50000'
        },
        // ===================================
        // EXECUTE ORDER
        // ===================================
        {
          callType: SquidCallType.DEFAULT,
          target: destinyChainMANA,
          value: '0',
          callData: marketplaceInterface.encodeFunctionData('executeOrder', [
            collectionAddress,
            tokenId,
            price
          ]),

          payload: {
            tokenAddress: '0x',
            inputPos: 0
          },
          estimatedGas: '300000'
        },
        // ===================================
        // Transfer NFT to buyer
        // ===================================
        {
          callType: SquidCallType.DEFAULT,
          target: collectionAddress,
          value: '0',
          callData: ERC721ContractInterface.encodeFunctionData(
            'safeTransferFrom(address, address, uint256)',
            [this.squidMulticall, fromAddress, tokenId]
          ),
          payload: {
            tokenAddress: '0x',
            inputPos: 1
          },
          estimatedGas: '50000'
        },
        // ===================================
        // Transfer remaining MANA to buyer
        // ===================================
        {
          callType: SquidCallType.FULL_TOKEN_BALANCE,
          target: destinyChainMANA,
          value: '0',
          callData: ERC20ContractInterface.encodeFunctionData('transfer', [
            fromAddress,
            '0'
          ]),
          payload: {
            tokenAddress: destinyChainMANA,

            // This will replace the parameter at index 1 in the encoded Function,
            //  with FULL_TOKEN_BALANCE (instead of "0")
            inputPos: 1
          },
          estimatedGas: '50000'
        }
      ]
    })
  }

  private async executeRoute(
    route: RouteResponse,
    provider: Provider
  ): Promise<ethers.ethers.providers.TransactionReceipt> {
    const { route: data } = route
    const signer = await new ethers.providers.Web3Provider(provider).getSigner()

    // tslint:disable-next-line
    const txResponse = (await this.squid.executeRoute({
      route: data,
      signer
    })) as ethers.providers.TransactionResponse
    return txResponse.wait()
  }

  //   private async getSigner(provider: Provider): Promise<Signer> {
  //     // const provider = new ethers.providers.JsonRpcProvider(
  //     //   process.env.AVAX_RPC_ENDPOINT
  //     // )
  //     // const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  //     const p = new ethers.providers.Web3Provider(provider)
  //     return await new ethers.providers.Web3Provider(provider).getSigner()
  //     // return signer
  //   }
}
