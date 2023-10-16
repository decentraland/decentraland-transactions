import { Provider } from 'types'
import { XChainCallData } from './types'

export interface XChainProvider {
  sendTransaction(
    provider: Provider,
    ChainCallData: XChainCallData
  ): Promise<string>
}
