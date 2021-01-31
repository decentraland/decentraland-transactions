import { Provider } from './types'

const GET_NONCE_HEX = '2d0335ab'
const EXECUTE_META_TRANSACTION_HEX = '0c53c51c'

export async function getAccount(provider: Provider): Promise<string> {
  const { result: accounts }: { result: string[] } = await provider.send(
    'eth_requestAccounts',
    []
  )
  return accounts[0]
}

export async function getSignature(
  provider: Provider,
  account: string,
  dataToSign: string
): Promise<string> {
  const {
    result: signature
  }: { result: string } = await provider.send('eth_signTypedData_v4', [
    account,
    dataToSign
  ])
  return signature
}

export function getExecuteMetaTransactionData(
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
    to32Bytes(account.replace('0x', '')),
    to32Bytes('a0'),
    r,
    s,
    to32Bytes(v),
    to32Bytes(44),
    functionSignature.replace('0x', '').padEnd(64 * 3, '0')
  ].join('')
}

export async function getNonce(
  provider: Provider,
  account: string,
  contractAddress: string
): Promise<string> {
  const hexSigner = to32Bytes(account.replace('0x', ''))

  return provider.send('eth_call', [
    {
      data: `0x${GET_NONCE_HEX}${hexSigner}`,
      to: contractAddress
    },
    'latest'
  ])
}

export function getSalt(chainId: number | string) {
  return `0x${to32Bytes(chainId)}`
}

function to32Bytes(value: number | string): string {
  return value.toString().padStart(64, '0')
}
