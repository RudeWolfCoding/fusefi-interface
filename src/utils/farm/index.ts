import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql } from '@apollo/client'
import Config from '../../constants/abis/config.json'
import { SingleRewardProgram, MultiRewardProgram } from '@fuseio/earn-sdk'

export const fetchStakingTimes = async (contract: string, library: any, type: string, rewardsToken?: string) => {
  let staking
  if (type == 'single') {
    staking = new SingleRewardProgram(contract, library)
    return await staking.getStakingTimes()
  } else {
    staking = new MultiRewardProgram(contract, library)
    return await staking.getStakingTimes(rewardsToken)
  }
}

export const fetchStakerInfo = async (
  contract: string,
  library: any,
  type: string,
  account: string,
  rewardsToken?: string
) => {
  let staking
  if (type == 'single') {
    staking = new SingleRewardProgram(contract, library)
    return await staking.getStakingTimes()
  } else {
    staking = new MultiRewardProgram(contract, library)
    return await staking.getStakerInfo(account, rewardsToken)
  }
}

export const fetchStats = async (account: string, token: string, contract: string, type: string, library: any) => {
  let staking
  const rewards = ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629']
  if (type == 'single') {
    staking = new SingleRewardProgram(contract, library)
    console.log(await staking.getStats(account, token, 122, rewards))
    return await staking.getStats(account, token, 122, rewards)
  } else {
    staking = new MultiRewardProgram(contract, library)
    console.log(await staking.getStats(account, token, 122, rewards))
    return await staking.getStats(account, token, 122, rewards)
  }
}

export function selectPercentage(amount: number, lp: string, balance: string, estimate: any, withdrawValue: any) {
  const calculated = (Number(lp) * amount) / 100
  const rewards = Number(estimate) + (Number(estimate) / Number(balance)) * ((Number(lp) * amount) / 100)
  estimate(rewards.toFixed(2).toString())
  withdrawValue(calculated.toString())
}

export const getFarmingPools = async (library: any) => {
  const result = []
  const obj: { [index: string]: any } = Config[0].contracts.fuse
  for (const key in obj) {
    let reward = ''

    if (typeof obj[key].rewards !== 'undefined' && obj[key].rewards.length > 0) {
      reward = obj[key].rewards[0]
    }
    const data = await fetchStakingTimes(key, library?.provider, obj[key].type, reward)
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
  console.log(result)
  return result
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
