import { Provider } from './types'

const GET_NONCE_HEX = '2d0335ab'
const EXECUTE_META_TRANSACTION_HEX = '0c53c51c'

export class Contract {
  constructor(public provider: Provider) {}

  async getAccount(): Promise<string> {
    const { result: accounts }: { result: string[] } = await this.provider.send(
      'eth_requestAccounts',
      []
    )
    return accounts[0]
  }

  async getSignature(account: string, dataToSign: string): Promise<string> {
    const {
      result: signature
    }: { result: string } = await this.provider.send('eth_signTypedData_v4', [
      account,
      dataToSign
    ])
    return signature
  }

  async getExecuteMetaTransactionData(
    account: string,
    fullSignature: string,
    functionSignature: string
  ) {
    const signature = fullSignature.replace('0x', '')
    const r = signature.substring(0, 64)
    const s = signature.substring(64, 128)
    const v = signature.substring(128, 130)

    return [
      '0x',
      EXECUTE_META_TRANSACTION_HEX,
      this.to32Bytes(account.replace('0x', '')),
      this.to32Bytes('a0'),
      r,
      s,
      this.to32Bytes(v),
      this.to32Bytes(44),
      functionSignature.replace('0x', '').padEnd(64 * 3, '0')
    ].join('')
  }

  async getNonce(account: string, contractAddress: string): Promise<string> {
    const hexSigner = this.to32Bytes(account.replace('0x', ''))

    return this.provider.send('eth_call', [
      {
        data: `0x${GET_NONCE_HEX}${hexSigner}`,
        to: contractAddress
      },
      'latest'
    ])
  }

  getSalt(chainId: number | string) {
    return `0x${this.to32Bytes(chainId)}`
  }

  private to32Bytes(value: number | string): string {
    return value.toString().padStart(64, '0')
  }
}
