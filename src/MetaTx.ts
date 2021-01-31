import { Contract } from './Contract'
import { getConfiguration } from './configuration'
import {
  Provider,
  Configuration,
  DataToSign,
  ContractData,
  DomainData,
  DOMAIN_TYPE,
  META_TRANSACTION_TYPE
} from './types'

export class MetaTx {
  l1Contract: Contract
  l2Contract: Contract
  configuration: Configuration

  constructor(
    l1Provider: Provider,
    l2Provider: Provider,
    configuration: Partial<Configuration> = {}
  ) {
    this.l1Contract = new Contract(l1Provider)
    this.l2Contract = new Contract(l2Provider)
    this.configuration = {
      ...getConfiguration(),
      ...configuration
    }
  }

  async sendMetaTransaction(
    functionSignature: string,
    contractData: ContractData
  ) {
    try {
      const account = await this.l1Contract.getAccount()
      const nonce = await this.l2Contract.getNonce(
        account,
        contractData.address
      )
      const salt = this.l2Contract.getSalt(contractData.chainId)

      const domainData = this.getDomainData(salt, contractData)
      const dataToSign = this.getDataToSign(
        account,
        nonce,
        functionSignature,
        domainData
      )
      const signature = await this.l1Contract.getSignature(
        account,
        JSON.stringify(dataToSign)
      )

      const txData = await this.l2Contract.getExecuteMetaTransactionData(
        account,
        signature,
        functionSignature
      )

      const res = await fetch(`${this.configuration.serverURL}/transactions`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: {
            from: account,
            params: [contractData.address, txData]
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
      throw error
    }
  }

  getDataToSign(
    account: string,
    nonce: string,
    functionSignature: string,
    domainData: DomainData
  ): DataToSign {
    return {
      types: {
        EIP712Domain: DOMAIN_TYPE,
        MetaTransaction: META_TRANSACTION_TYPE
      },
      domain: domainData,
      primaryType: 'MetaTransaction',
      message: {
        nonce: parseInt(nonce, 16),
        from: account,
        functionSignature: functionSignature
      }
    }
  }

  getDomainData(salt: string, contractData: ContractData): DomainData {
    return {
      name: contractData.name,
      version: contractData.version,
      verifyingContract: contractData.address,
      salt
    }
  }
}
