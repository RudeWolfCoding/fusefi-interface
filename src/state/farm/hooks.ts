import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { getChainNetworkLibrary } from '../../connectors'
import { useActiveWeb3React } from '../../hooks'
import { tryFormatAmount } from '../../utils'
import { getProgram } from '../../utils/farm'
import axios from 'axios'

let networkContracts: any = []

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

async function fetchNetworksContracts() {
  const contractsUrl = 'https://raw.githubusercontent.com/fuseio/fuse-lp-rewards/master/config/default.json'
  const { data: { contracts } } = await axios.get(contractsUrl)
  networkContracts = Object.assign({}, ...Object.values(contracts))
  const multiContracts = Object.values(networkContracts).filter((contract: any) => contract.type === 'multi')
  return multiContracts
}

async function fetchFarms(account?: string) {
  try {
    const multiContracts = await fetchNetworksContracts()
    return await Promise.all(Object.values(multiContracts).map((farm: any) => fetchFarm(farm, account)))
  } catch (error) {
    console.error(error)
    return []
  }
}

export function useFarm(farmAddress: string) {
  const { account } = useActiveWeb3React()
  const [farm, setFarm] = useState(null)

  const contract = useMemo(() => {
    return networkContracts[farmAddress] ? networkContracts[farmAddress] : undefined
  }, [farmAddress])

  useEffect(() => {
    fetchFarm(contract, account ?? undefined).then(farm => setFarm(farm))
  }, [account, contract])

  return farm
}

export function useFarms(chainId: number) {
  const { account } = useActiveWeb3React()
  const [farms, setFarms] = useState<any>([])
  const [isLoading, setLoading] = useState<any>(true)

  useEffect(() => {
    setLoading(true)
    fetchFarms(account ?? undefined).then(data => {
      setLoading(false)
      setFarms(data)
    })
  }, [account, chainId])

  return [farms, isLoading]
}
