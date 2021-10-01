import { gql } from '@apollo/client/core'
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
