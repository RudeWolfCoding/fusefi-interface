import { ApolloClient, InMemoryCache } from '@apollo/client'
import { FUSESWAP_SUBGRAPH_URL } from '../constants/subgraphs'

export const fuseswapSubgraphClient = new ApolloClient({
  uri: FUSESWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
})
