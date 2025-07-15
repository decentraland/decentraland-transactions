export interface ExtractedData {
  functionData: string
  signature: string
  account: string
  functionDataLength: number
  signatureLength: number
  firstOffset: string
  secondOffset: string
}

export function extractFunctionData(transactionData: string): ExtractedData {
  // Remove 0x prefix if present
  const data = transactionData.startsWith('0x')
    ? transactionData.slice(2)
    : transactionData

  // Function selector is 4 bytes (8 hex chars)
  const FUNCTION_SELECTOR_LENGTH = 8
  const FUNCTION_SELECTOR = 'd8ed1acc'

  // Check if this is the correct function
  const actualSelector = data.substring(0, FUNCTION_SELECTOR_LENGTH)
  if (actualSelector !== FUNCTION_SELECTOR) {
    throw new Error(
      `Invalid function selector. Expected ${FUNCTION_SELECTOR}, got ${actualSelector}`
    )
  }

  // Each 32-byte field is 64 hex characters
  const FIELD_SIZE = 64

  // Skip function selector (4 bytes = 8 hex chars)
  let position = FUNCTION_SELECTOR_LENGTH

  // Skip account address (32 bytes)
  position += FIELD_SIZE

  // Skip first offset (32 bytes) - should be '60'
  const firstOffset = data.substring(position, position + FIELD_SIZE)
  console.log(`First offset: 0x${firstOffset}`)
  position += FIELD_SIZE

  // Skip second offset (32 bytes)
  const secondOffset = data.substring(position, position + FIELD_SIZE)
  console.log(`Second offset: 0x${secondOffset}`)
  position += FIELD_SIZE

  // Get function data length (32 bytes)
  const functionDataLengthHex = data.substring(position, position + FIELD_SIZE)
  const functionDataLength = parseInt(functionDataLengthHex, 16)
  console.log(`Function data length: ${functionDataLength} bytes`)
  position += FIELD_SIZE

  // Extract function data
  const functionData = data.substring(
    position,
    position + functionDataLength * 2
  )
  position += functionDataLength * 2

  // Skip signature length (32 bytes)
  const signatureLengthHex = data.substring(position, position + FIELD_SIZE)
  const signatureLength = parseInt(signatureLengthHex, 16)
  console.log(`Signature length: ${signatureLength} bytes`)
  position += FIELD_SIZE

  // Extract signature
  const signature = data.substring(position, position + signatureLength * 2)

  return {
    functionData: `0x${functionData}`,
    signature: `0x${signature}`,
    account: `0x${data.substring(
      FUNCTION_SELECTOR_LENGTH + FIELD_SIZE - 40,
      FUNCTION_SELECTOR_LENGTH + FIELD_SIZE
    )}`,
    functionDataLength,
    signatureLength,
    firstOffset: `0x${firstOffset}`,
    secondOffset: `0x${secondOffset}`
  }
}
