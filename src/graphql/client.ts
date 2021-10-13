import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ETHEREUM_AMB_SUBGRAPH_URL, FUSESWAP_SUBGRAPH_URL, FUSE_AMB_SUBGRAPH_URL } from '../constants/subgraphs'

export const fuseswapSubgraphClient = new ApolloClient({
  uri: FUSESWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const ethereumAmbSubgraphClient = new ApolloClient({
  uri: ETHEREUM_AMB_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const fuseAmbSubgraphClient = new ApolloClient({
  uri: FUSE_AMB_SUBGRAPH_URL,
  cache: new InMemoryCache()
})
