import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql } from '@apollo/client'
import Config from '../../constants/abis/config.json'
import { SingleRewardProgram, MultiRewardProgram } from '@fuseio/earn-sdk'
import { useActiveWeb3React } from '../../hooks'
import { useEffect, useState } from 'react'
import { Reward } from './constants'

export const rewardsToken = Config[0].rewardTokens[122]

export const getProgram = (contract: string, library: any, type: string) => {
  if (type === 'single') {
    return new SingleRewardProgram(contract, library)
  } else {
    return new MultiRewardProgram(contract, library)
  }
}

export const fetchStakingTimes = async (contract: string, library: any, type: string) => {
  const staking = getProgram(contract, library, type)
  return await staking.getStakingTimes(rewardsToken)
}

export const fetchStakerInfo = async (contract: string, library: any, type: string, account: string) => {
  const staking = getProgram(contract, library, type)
  return await staking.getStakerInfo(account, rewardsToken)
}

export const fetchStats = async (account: string, token: string, contract: string, type: string, library: any) => {
  const staking = getProgram(contract, library, type)
  return await staking.getStats(account, token, 122, [rewardsToken])
}

export const getFarmingPools = async (library: any) => {
  const result = []
  const obj: { [index: string]: any } = Config[0].contracts.fuse
  for (const key in obj) {
    const data = await fetchStakingTimes(key, library?.provider, obj[key].type)
    const response = {
      ...data,
      ...obj[key],
      totalReward: obj[key].totalReward ? obj[key].totalReward : 0,
      start: new Date(data.start * 1000),
      duration: data.duration / 86400,
      end: new Date(data.end * 1000),
      isActive: new Date(data.end * 1000) > new Date() ? true : false
    }
    result.push(response)
  }
  return result
}

export const useFarmPools = async () => {
  const { library } = useActiveWeb3React()
  const [farmRewards, setFarms] = useState<Reward[]>([])

  useEffect(() => {
    let mounted = true
    getFarmingPools(library).then(res => {
      if (mounted) {
        setFarms([...res])
      }
    })
    return () => {
      mounted = false
    }
  }, [library])
  return await farmRewards
}

export async function getSwapStats() {
  const client = new ApolloClient({
    uri: `${Config[0].api.graph.fuseswap.url}${Config[0].api.graph.fuseswap.subgraphs.fuseswap}`,
    cache: new InMemoryCache()
  })

  const stakingContractInstance = client
    .query({
      query: gql`
        {
          uniswapFactories(first: 1) {
            pairCount
            totalVolumeUSD
            untrackedVolumeUSD
            totalLiquidityUSD
            txCount
          }
        }
      `
    })
    .then(res => {
      return res
    })
  const transactionPromise = await stakingContractInstance
  return transactionPromise.data.uniswapFactories[0]
}
