import { ethers, providers, Contract } from 'ethers'
import { getConfiguration } from '../configuration'
import {
  ChainId,
  Configuration,
  ContractData,
  DataToSign,
  DOMAIN_TYPE,
  META_TRANSACTION_TYPE
} from '../types'
import { Client, MethodData, GetSignature } from './Client'

export class Ethers implements Client {
  signer: string
  provider: providers.Provider

  constructor(signer: string, provider?: providers.Provider) {
    this.signer = signer
    this.provider =
      provider ||
      new ethers.providers.WebSocketProvider(
        getConfiguration().websocketProvider
      )
  }

  async sendMetaTransaction(
    methodData: MethodData,
    getSignature: GetSignature,
    configuration: Configuration
  ) {
    try {
      const { functionSignature, contractData } = methodData
      const dataToSign = await this.getDataToSign(methodData)
      const fullSignature = await getSignature(dataToSign)

      const signature = fullSignature.substring(2)
      const r = '0x' + signature.substring(0, 64)
      const s = '0x' + signature.substring(64, 128)
      const v = '0x' + signature.substring(128, 130)

      const contract = this.getContract(contractData)

      const txMethod = await contract.populateTransaction.executeMetaTransaction(
        this.signer,
        functionSignature,
        r,
        s,
        v
      )

      const res = await fetch(configuration.serverURL, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: {
            from: this.signer,
            params: [contract.address, txMethod.data]
          }
        }),
        method: 'POST'
      })

      return (await res.json()) as string
    } catch (error) {
      console.log(
        'An error occurred trying to send the meta transaction',
        error.message
      )
      return error
    }
  }

  async getDataToSign(methodData: MethodData): Promise<DataToSign> {
    const { contractData, functionSignature } = methodData

    const contract = this.getContract(contractData)

    const [chainId, nonce]: [ChainId, string] = await Promise.all([
      contract.getChainId(),
      contract.getNonce(this.signer)
    ])

    const domainData = {
      name: contractData.name,
      version: contractData.version,
      verifyingContract: contract.address,
      salt: this.getSalt(chainId)
    }

    return {
      types: {
        EIP712Domain: DOMAIN_TYPE,
        MetaTransaction: META_TRANSACTION_TYPE
      },
      domain: domainData,
      primaryType: 'MetaTransaction',
      message: {
        nonce: parseInt(nonce),
        from: this.signer,
        functionSignature: functionSignature
      }
    }
  }

  getSalt(chainId: ChainId) {
    return ethers.utils.hexZeroPad(chainId.toString(), 64)
  }

  private getContract(contractData: ContractData): Contract {
    return new Contract(contractData.address, contractData.abi, this.provider)
  }
}
