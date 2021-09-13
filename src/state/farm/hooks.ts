import { useEffect, useMemo, useState } from 'react'
import { FARM_CONTRACTS } from '../../constants/farms'
import { useActiveWeb3React } from '../../hooks'
import { getProgram } from '../../utils/farm'
import { useBlockNumber } from '../application/hooks'

async function fetchFarm(
  { contractAddress, rewards, LPToken, networkId, type, pairName }: any,
  account: string,
  library: any
) {
  const rewardProgram = getProgram(contractAddress, library.provider, type)
  const stats = await rewardProgram.getStats(account, LPToken, networkId, rewards)
  const [totalStaked] = await rewardProgram.getStakerInfo(account, rewards[0])
  const stakingTimes = await rewardProgram.getStakingTimes(rewards[0])
  return {
    contractAddress,
    rewards,
    LPToken,
    networkId,
    pairName,
    totalStaked,
    ...stats,
    ...stakingTimes
  }
}

async function fetchFarms(farmList: Array<any>, account?: string, library?: any) {
  if (!account || !library) return []
  const farms = await Promise.all(farmList.map(farm => fetchFarm(farm, account, library)))
  return farms
}

export function useFarm(farmAddress: string) {
  const { account, chainId, library } = useActiveWeb3React()
  const [farm, setFarm] = useState(null)
  const blockNumber = useBlockNumber()

  const contract = useMemo(() => {
    if (chainId && farmAddress) return FARM_CONTRACTS[chainId][farmAddress]
    return undefined
  }, [chainId, farmAddress])

  useEffect(() => {
    if (account && library) {
      fetchFarm(contract, account, library).then(farm => setFarm(farm))
    }
  }, [account, contract, library, blockNumber])

  return farm
}

export function useFarms() {
  const { chainId, library, account } = useActiveWeb3React()
  const [farms, setFarms] = useState<any>([])
  const blockNumber = useBlockNumber()

  const contracts = useMemo(() => {
    if (chainId) return Object.values(FARM_CONTRACTS[chainId])
    return undefined
  }, [chainId])

  useEffect(() => {
    if (account && library && contracts) {
      fetchFarms(contracts, account, library).then(farms => setFarms(farms))
    }
  }, [account, contracts, library, blockNumber])

  return farms
}
