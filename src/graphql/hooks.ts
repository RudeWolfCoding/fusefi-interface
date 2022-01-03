import { ChainId } from '@fuseio/fuse-swap-sdk'
import { useMemo } from 'react'
import useSWR from 'swr'
import { Chef } from '../state/chefs/hooks'
import { getMasterChefV2Farms, getMasterChefV3Farms } from './queries'

interface UseChefFarmProps {
  shouldFetch?: boolean
}

export function useMasterChefV2Farms({ shouldFetch }: UseChefFarmProps) {
  const { data } = useSWR(shouldFetch ? 'masterChefV2Farms' : null, () => getMasterChefV2Farms())
  return useMemo(() => {
    if (!data) return []
    return data.map((data: any) => ({ ...data, type: 'chef', chef: Chef.MASTERCHEF_V2 }))
  }, [data])
}

export function useMasterChefV3Farms({ shouldFetch }: UseChefFarmProps) {
  const { data } = useSWR(shouldFetch ? 'masterChefV3Farms' : null, () => getMasterChefV3Farms())
  return useMemo(() => {
    if (!data) return []
    return data.map((data: any) => ({ ...data, type: 'chef', chef: Chef.MASTERCHEF_V3 }))
  }, [data])
}

export function useChefFarms(chainId?: ChainId) {
  const shouldFetch = chainId === ChainId.FUSE

  const masterChefV2Farms = useMasterChefV2Farms({ shouldFetch })
  const masterChefV3Farms = useMasterChefV3Farms({ shouldFetch })

  return useMemo(() => masterChefV2Farms.concat(masterChefV3Farms).filter((pool: any) => pool && pool.pair), [
    masterChefV2Farms,
    masterChefV3Farms
  ])
}
