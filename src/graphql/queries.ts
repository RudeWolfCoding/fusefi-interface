import { ApolloClient, gql } from '@apollo/client/core'
import { fuseswapSubgraphClient } from './client'
import { FACTORY_ADDRESS } from '../constants'

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

export const getMessageFromTxHash = async (subgraph: ApolloClient<any>, txHash: string) => {
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
    `
  })

  console.log(result, subgraph)

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

export const getMessageStatus = async (subgraph: ApolloClient<any>, messageId: string) => {
  const result = await subgraph.query({
    query: gql`
      query getRelayedMessages($messageId: String!) {
        relayedMessages(where: { messageId_contains: $messageId }, first: 1) {
          txHash
          id
        }
      }
    `,
    variables: {
      messageId
    }
  })

  return result.data && result.data.relayedMessages && result.data.relayedMessages.length > 0
    ? result.data.relayedMessages[0]
    : null
}
