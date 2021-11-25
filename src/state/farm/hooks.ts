import { ChainId } from '@fuseio/fuse-swap-sdk'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { getChainNetworkLibrary } from '../../connectors'
import { FARM_CONTRACTS } from '../../constants/farms'
import { useActiveWeb3React } from '../../hooks'
import { tryFormatAmount } from '../../utils'
import { getProgram } from '../../utils/farm'

async function fetchFarm({ contractAddress, rewards, LPToken, networkId, type, pairName }: any, account?: string) {
  const accountAddress = account || ethers.constants.AddressZero
  const networkLibrary = getChainNetworkLibrary(networkId)
  const rewardProgram = getProgram(contractAddress, networkLibrary.provider, type)
  const stats = await rewardProgram.getStats(accountAddress, LPToken, networkId, rewards)
  const [totalStaked] = await rewardProgram.getStakerInfo(accountAddress, rewards[0])
  const stakingTimes = await rewardProgram.getStakingTimes(rewards[0])
  const isExpired = stakingTimes.end < dayjs().unix()
  const durationInDays = stakingTimes.duration / 86400
  const totalRewards = tryFormatAmount(stats.rewardsInfo[0].totalRewards, 18) ?? 0
  const rewardsUSDPerDay = stats.rewardsInfo[0].totalRewardsInUSD / durationInDays
  const rewardsPerDay = Number(totalRewards) / durationInDays

  return {
    contractAddress,
    rewards,
    LPToken,
    networkId,
    pairName,
    totalStaked,
    isExpired,
    rewardsUSDPerDay,
    rewardsPerDay,
    ...stats,
    ...stakingTimes
  }
}

async function fetchFarms(farmList: Array<any>, account?: string) {
  return await Promise.all(farmList.map(farm => fetchFarm(farm, account)))
}

export function useFarm(farmAddress: string) {
  const { account } = useActiveWeb3React()
  const [farm, setFarm] = useState(null)

  const contract = useMemo(() => {
    if (farmAddress)
      return FARM_CONTRACTS[ChainId.FUSE][farmAddress] ? FARM_CONTRACTS[ChainId.FUSE][farmAddress] : undefined
    return undefined
  }, [farmAddress])

  useEffect(() => {
    fetchFarm(contract, account ?? undefined).then(farm => setFarm(farm))
  }, [account, contract])

  return farm
}

export function useFarms(chainId: number) {
  const { account } = useActiveWeb3React()
  const [farms, setFarms] = useState<any>([])

  useEffect(() => {
    setFarms([])
    const contracts = Object.values(FARM_CONTRACTS[chainId])
    if (contracts) {
      fetchFarms(contracts, account ?? undefined).then(farms => setFarms(farms))
    }
  }, [account, chainId])

  return farms
}
