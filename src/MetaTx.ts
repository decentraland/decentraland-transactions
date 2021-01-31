import { getConfiguration } from './configuration'
import {
  Provider,
  ChainId,
  Configuration,
  DataToSign,
  MetaTxData,
  DOMAIN_TYPE,
  META_TRANSACTION_TYPE
} from './types'

const GET_NONCE_HEX = '2d0335ab'
const EXECUTE_META_TRANSACTION_HEX = '0c53c51c'

export class MetaTx {
  configuration: Configuration
  private signer: string | undefined

  constructor(
    public l1Provider: Provider,
    public l2Provider: Provider,
    configuration: Partial<Configuration> = {}
  ) {
    this.configuration = {
      ...getConfiguration(),
      ...configuration
    }
  }

  async getSigner(): Promise<string> {
    if (this.signer) {
      return this.signer
    }
    const {
      result: accounts
    }: { result: string[] } = await this.l1Provider.send(
      'eth_requestAccounts',
      []
    )

    if (accounts.length === 0) {
      throw new Error('Could not get Accounts')
    }

    this.signer = accounts[0]
    return this.signer
  }

  async sendMetaTransaction(metaTxData: MetaTxData) {
    try {
      const { functionSignature, contractData } = metaTxData

      const signer = await this.getSigner()
      const dataToSign = await this.getDataToSign(metaTxData)

      const fullSignature = await this.getSignature(dataToSign)
      const signature = fullSignature.substring(2)

      const txMethodData = await this.getExecuteMetaTransactionData(
        signature,
        functionSignature
      )

      const res = await fetch(`${this.configuration.serverURL}/transactions`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: {
            from: signer,
            params: [contractData.address, txMethodData]
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

  async getSignature(dataToSign: DataToSign): Promise<string> {
    const signer = await this.getSigner()

    const {
      result: signature
    }: { result: string } = await this.l1Provider.send('eth_signTypedData_v4', [
      signer,
      JSON.stringify(dataToSign)
    ])
    return signature
  }

  async getDataToSign(metaTxData: MetaTxData): Promise<DataToSign> {
    const { contractData, functionSignature } = metaTxData

    const signer = await this.getSigner()
    const nonce: string = await this.getNonce(contractData.address)

    const domainData = {
      name: contractData.name,
      version: contractData.version,
      verifyingContract: contractData.address,
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
        nonce: parseInt(nonce, 16),
        from: signer,
        functionSignature: functionSignature
      }
    }
  }

  private async getExecuteMetaTransactionData(
    signature: string,
    functionSignature: string
  ) {
    const signer = await this.getSigner()

    const r = signature.substring(0, 64)
    const s = signature.substring(64, 128)
    const v = signature.substring(128, 130)

    return [
      '0x',
      EXECUTE_META_TRANSACTION_HEX,
      this.to32Bytes(signer.replace('0x', '')),
      this.to32Bytes('a0'),
      r,
      s,
      this.to32Bytes(v),
      this.to32Bytes(44),
      functionSignature.replace('0x', '').padEnd(64 * 3, '0')
    ].join('')
  }

  private async getNonce(contractAddress: string): Promise<string> {
    const signer = await this.getSigner()
    const hexSigner = this.to32Bytes(signer.replace('0x', ''))

    return this.l2Provider.send('eth_call', [
      {
        data: `0x${GET_NONCE_HEX}${hexSigner}`,
        to: contractAddress
      },
      'latest'
    ])
  }

  private getSalt(chainId: ChainId) {
    return `0x${this.to32Bytes(chainId)}`
  }

  private to32Bytes(value: number | string): string {
    return value.toString().padStart(64, '0')
  }
}
