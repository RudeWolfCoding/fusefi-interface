import { ChainId } from '@fuseio/fuse-swap-sdk'
import { ethereumAmbSubgraphClient, fuseAmbSubgraphClient } from './client'

export const getAmbSubgraph = (chainId: ChainId) => {
  if (chainId === ChainId.FUSE) {
    return fuseAmbSubgraphClient
  } else {
    return ethereumAmbSubgraphClient
  }
}
