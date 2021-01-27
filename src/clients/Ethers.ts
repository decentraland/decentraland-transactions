import { ethers, providers, Contract, BigNumber } from 'ethers'
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
  configuration: Configuration

  constructor(
    signer: string,
    configuration: Partial<Configuration> = {},
    provider?: providers.Provider
  ) {
    this.signer = signer
    this.configuration = {
      ...getConfiguration(),
      ...configuration
    }
    this.provider =
      provider ||
      new ethers.providers.WebSocketProvider(
        this.configuration.websocketProvider
      )
  }

  async sendMetaTransaction(
    methodData: MethodData,
    getSignature: GetSignature
  ) {
    try {
      const { functionSignature, contractData } = methodData
      const dataToSign = await this.getDataToSign(methodData)
      const fullSignature = await getSignature(this.signer, dataToSign)

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

      const res = await fetch(`${this.configuration.serverURL}/transactions`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: {
            from: this.signer,
            params: [contract.address, txMethod.data]
          }
        }),
        method: 'POST'
      })

      const { txHash } = (await res.json()) as { txHash: string }
      return txHash
    } catch (error) {
      console.log(
        'An error occurred trying to send the meta transaction',
        error.message
      )
      return error
    }
  }

  private async getDataToSign(methodData: MethodData): Promise<DataToSign> {
    const { contractData, functionSignature } = methodData

    const contract = this.getContract(contractData)
    const nonce: BigNumber = await contract.getNonce(this.signer)

    const domainData = {
      name: contractData.name,
      version: contractData.version,
      verifyingContract: contract.address,
      salt: this.getSalt(contractData.chainId)
    }

    return {
      types: {
        EIP712Domain: DOMAIN_TYPE,
        MetaTransaction: META_TRANSACTION_TYPE
      },
      domain: domainData,
      primaryType: 'MetaTransaction',
      message: {
        nonce: nonce.toNumber(),
        from: this.signer,
        functionSignature: functionSignature
      }
    }
  }

  private getSalt(chainId: ChainId) {
    return `0x${chainId.toString().padStart(64, '0')}`
  }

  private getContract(contractData: ContractData): Contract {
    return new Contract(contractData.address, contractData.abi, this.provider)
  }
}
