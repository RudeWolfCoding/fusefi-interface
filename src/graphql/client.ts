import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  BSC_FUSE_AMB_SUBGRAPH_URL,
  ETH_FUSE_AMB_SUBGRAPH_URL,
  FUSESWAP_SUBGRAPH_URL,
  FUSE_BSC_AMB_SUBGRAPH_URL,
  FUSE_ETH_AMB_SUBGRAPH_URL,
  FUSE_ETH_NATIVE_BRIDGE_SUBGRAPH_URL,
  ETH_FUSE_NATIVE_BRIDGE_SUBGRAPH_URL
} from '../constants/subgraphs'

export const fuseswapSubgraphClient = new ApolloClient({
  uri: FUSESWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const ethFuseAmbSubgraphClient = new ApolloClient({
  uri: ETH_FUSE_AMB_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const fuseEthAmbSubgraphClient = new ApolloClient({
  uri: FUSE_ETH_AMB_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const fuseBscAmbSubgraphClient = new ApolloClient({
  uri: FUSE_BSC_AMB_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const bscFuseAmbSubgraphClient = new ApolloClient({
  uri: BSC_FUSE_AMB_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const fuseEthNativeSubgraphClient = new ApolloClient({
  uri: FUSE_ETH_NATIVE_BRIDGE_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const ethFuseNativeSubgraphClient = new ApolloClient({
  uri: ETH_FUSE_NATIVE_BRIDGE_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const masterChefV2Client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/mul53/masterchefv2',
  cache: new InMemoryCache()
})

export const masterChefV3Client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/mul53/masterchefv3',
  cache: new InMemoryCache()
})

export const blockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/fuseio/fuse-blocks',
  cache: new InMemoryCache()
})
