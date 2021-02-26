import { Provider, EIPProvider } from './types'

const GET_NONCE_FUNCTION_SELECTOR = '2d0335ab'
const EXECUTE_META_TRANSACTION_FUNCTION_SELECTOR = '0c53c51c'

export async function getAccount(provider: Provider): Promise<string> {
  const accounts: string[] = await send(provider, 'eth_requestAccounts', [])
  if (accounts.length === 0) {
    throw new Error('Could not find a valid connected account')
  }
  return accounts[0]
}

export async function getSignature(
  provider: Provider,
  account: string,
  dataToSign: string
): Promise<string> {
  return send(provider, 'eth_signTypedData_v4', [account, dataToSign])
}

export function getExecuteMetaTransactionData(
  account: string,
  fullSignature: string,
  functionSignature: string
): string {
  const signature = fullSignature.replace('0x', '')
  const r = signature.substring(0, 64)
  const s = signature.substring(64, 128)
  const v = signature.substring(128, 130)

  const signatureLength = (signature.length / 2).toString(16)
  const signaturePadding = Math.ceil(signature.length / 64)

  return [
    '0x',
    EXECUTE_META_TRANSACTION_FUNCTION_SELECTOR,
    to32Bytes(account.replace('0x', '')),
    to32Bytes('a0'),
    r,
    s,
    to32Bytes(v),
    to32Bytes(signatureLength),
    signature.padEnd(64 * signaturePadding, '0')
  ].join('')
}

export async function getNonce(
  provider: Provider,
  account: string,
  contractAddress: string
): Promise<string> {
  const hexSigner = to32Bytes(account.replace('0x', ''))

  return send(provider, 'eth_call', [
    {
      data: `0x${GET_NONCE_FUNCTION_SELECTOR}${hexSigner}`,
      to: contractAddress
    },
    'latest'
  ])
}

export function getSalt(chainId: number | string): string {
  return `0x${to32Bytes(chainId)}`
}

function to32Bytes(value: number | string): string {
  return value.toString().padStart(64, '0')
}

async function send<T>(
  provider: Provider,
  method: string,
  params: any[]
): Promise<T> {
  let data: T | { result: T } | undefined

  if (typeof provider['request'] !== 'undefined') {
    data = await (provider as EIPProvider).request({ method, params })
  }
  if (typeof provider['send'] !== 'undefined') {
    data = await provider.send(method, params)
  }

  if (data) {
    return data['result'] || data
  } else {
    throw new Error(
      'Could not send the transaction. Provider is missing either a send or request method'
    )
  }
}
