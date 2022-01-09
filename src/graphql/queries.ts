/* eslint-disable @typescript-eslint/camelcase */
import { ApolloClient, gql } from '@apollo/client/core'
import { blockClient, fuseswapSubgraphClient, masterChefV2Client, masterChefV3Client } from './client'
import { FACTORY_ADDRESS, VOLT_ADDRESS, XVOLT_ADDRESS } from '../constants'

interface Variables {
  [key: string]: any
}

export const getFuseswapFactoryData = async () => {
  const result = await fuseswapSubgraphClient.query({
    query: gql`
      {
        uniswapFactory(id: "${FACTORY_ADDRESS}") {
          pairCount
          totalVolumeUSD
          totalLiquidityUSD
        }
      }
    `
  })

  return result?.data?.uniswapFactory
}

export const getMessageFromTxHash = async (txHash: string | undefined, subgraph: ApolloClient<any> | null) => {
  if (!subgraph || !txHash) return null

  const result = await subgraph.query({
    query: gql`
      {
        userRequestForSignatures(where: { txHash_contains: "${txHash}" }, first: 1) {
          recipient
          message {
            msgId
            msgData
            signatures
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data &&
    result.data.userRequestForSignatures &&
    result.data.userRequestForSignatures.length > 0 &&
    result.data.userRequestForSignatures[0].message
    ? {
        ...result.data.userRequestForSignatures[0].message,
        ...result.data.userRequestForSignatures[0]
      }
    : null
}

export const getUserRequestFromTxHash = async (txHash: string | undefined, subgraph: ApolloClient<any> | null) => {
  if (!subgraph || !txHash) return null

  const result = await subgraph.query({
    query: gql`
      {
        userRequestForSignatures(where: { txHash_contains: "${txHash}" }, first: 1) {
          message
          signatures
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data &&
    result.data.userRequestForSignatures &&
    result.data.userRequestForSignatures.length > 0 &&
    result.data.userRequestForSignatures[0].signatures
    ? {
        ...result.data.userRequestForSignatures[0]
      }
    : null
}

export const getStatusFromTxHash = async (messageId: string, subgraph: ApolloClient<any> | null) => {
  if (!subgraph) return null

  const result = await subgraph.query({
    query: gql`
      {
        relayedMessages(where: { messageId_contains: "${messageId}" }, first: 1) {
          id
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data && result.data.relayedMessages && result.data.relayedMessages.length > 0
    ? result.data.relayedMessages[0]
    : null
}

export const getNativeStatusFromTxHash = async (homeTxHash: string, subgraph: ApolloClient<any> | null) => {
  if (!subgraph) return null

  const result = await subgraph.query({
    query: gql`
      {
        relayedMessages(where: { homeTxHash_contains: "${homeTxHash}" }, first: 1) {
          id
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data && result.data.relayedMessages && result.data.relayedMessages.length > 0
    ? result.data.relayedMessages[0]
    : null
}

export const getMasterChefV2Farms = async () => {
  const result = await masterChefV2Client.query({
    query: gql`
      query poolsQuery(
        $first: Int! = 1000
        $skip: Int! = 0
        $orderBy: String! = "id"
        $orderDirection: String! = "desc"
        $block: Block_height
        $where: Pool_filter! = { allocPoint_gt: 0, accVoltPerShare_gt: 0 }
      ) {
        pools(
          first: $first
          skip: $skip
          orderBy: $orderBy
          orderDirection: $orderDirection
          block: $block
          where: $where
        ) {
          id
          pair
          allocPoint
          lastRewardTimestamp
          accVoltPerShare
          balance
          userCount
          owner {
            id
            voltPerSec
            totalAllocPoint
          }
        }
      }
    `
  })

  return result.data?.pools ? result.data?.pools : null
}

export const getMasterChefV3Farms = async () => {
  const result = await masterChefV3Client.query({
    query: gql`
      query poolsV2Query(
        $first: Int! = 1000
        $skip: Int! = 0
        $orderBy: String! = "id"
        $orderDirection: String! = "desc"
      ) {
        pools(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
          id
          pair
          allocPoint
          flpBalance
          owner {
            id
            totalAllocPoint
          }
          rewarder {
            id
            rewardToken
            tokenPerSec
          }
        }
      }
    `
  })

  return result.data?.pools ? result.data?.pools : null
}

export const getMasterChefV2TotalAllocPoint = async () => {
  const result = await masterChefV2Client.query({
    query: gql`
      query masterChefV2TotalAllocPoint($id: String! = "0x517083dcaf665a0a9c166cca21f37243ac9fb9ee") {
        masterChef(id: $id) {
          id
          totalAllocPoint
        }
      }
    `
  })

  return result.data?.masterChef ? result.data?.masterChef : null
}

export const getMasterChefV2VoltPerSec = async () => {
  const result = await masterChefV2Client.query({
    query: gql`
      query masterChefV2VoltPerSec($id: String! = "0x517083dcaf665a0a9c166cca21f37243ac9fb9ee") {
        masterChef(id: $id) {
          id
          voltPerSec
        }
      }
    `
  })

  return result.data?.masterChef ? result.data?.masterChef : null
}

export const tokenPriceQuery = gql`
  query tokenPriceQuery($id: String!) {
    token(id: $id) {
      id
      derivedETH
    }
  }
`

const bundleFields = gql`
  fragment bundleFields on Bundle {
    id
    ethPrice
  }
`

const fusePriceQuery = gql`
  query ethPriceQuery($id: Int! = 1, $block: Block_height) {
    bundles(id: $id, block: $block) {
      ...bundleFields
    }
  }

  ${bundleFields}
`

export const getBundle = async (query = fusePriceQuery, variables = { id: 1 }) => {
  const result = await fuseswapSubgraphClient.query({
    query,
    variables
  })

  return result.data?.bundles ? result.data?.bundles[0]?.ethPrice : null
}

export const getNativePrice = async (variables?: any) => {
  const result = await getBundle(undefined, variables)
  return result
}

export const getTokenPrice = async (query: any, variables: Variables) => {
  const nativePrice = await getNativePrice()

  const result = await fuseswapSubgraphClient.query({
    query,
    variables
  })

  return nativePrice && result.data?.token ? result.data?.token?.derivedETH * nativePrice : 0
}

export const getVoltPrice = async () => {
  return getTokenPrice(tokenPriceQuery, {
    id: VOLT_ADDRESS
  })
}

export const getXVoltPrice = async () => {
  return getTokenPrice(tokenPriceQuery, {
    id: XVOLT_ADDRESS
  })
}

export const getFusePrice = async (variables?: Variables) => {
  return getNativePrice(variables)
}

export const getMasterChefV2Pool = async (pid: string) => {
  const result = await masterChefV2Client.query({
    query: gql`
    {
      pool(id: "${pid}") {
        id
        balance
        pair
        allocPoint
        owner {
          id
          voltPerSec
          totalAllocPoint
        }
      }
    }
  `
  })

  return result?.data?.pool ? result?.data?.pool : null
}

export const getMasterChefV3Pool = async (pid: string) => {
  const result = await masterChefV3Client.query({
    query: gql`
    {
      pool(id: "${pid}") {
        id
        balance
        pair
        allocPoint
        owner {
          id
          voltPerSec
          totalAllocPoint
        }
      }
    }
  `
  })

  return result?.data?.pool ? result?.data?.pool : null
}

export const getBlock = async (variables?: any) => {
  const result = await blockClient.query({
    query: gql`
      query blockQuery($timestampFrom: Int, $timestampTo: Int) {
        blocks(
          first: 1
          where: { timestamp_gt: $timestampFrom, timestamp_lt: $timestampTo }
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          number
          timestamp
        }
      }
    `,
    variables
  })
  return { number: Number(result?.data?.blocks?.[0]?.number) }
}

export const getFactory = async (variables: any) => {
  const query = variables
    ? gql`
        {
          uniswapFactories(first: 1, block: { number: ${variables.blockNumber} }) {
            id
            totalVolumeUSD
            totalLiquidityUSD
          }
        }
      `
    : gql`
        {
          uniswapFactories(first: 1) {
            id
            totalVolumeUSD
            totalLiquidityUSD
          }
        }
      `

  const result = await fuseswapSubgraphClient.query({
    query
  })

  return result?.data?.uniswapFactories ? result?.data?.uniswapFactories?.[0] : null
}
