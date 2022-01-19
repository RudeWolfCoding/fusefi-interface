/* eslint-disable @typescript-eslint/camelcase */
import { ChainId } from '@fuseio/fuse-swap-sdk'
import { useMemo } from 'react'
import useSWR from 'swr'
import { addSeconds, getUnixTime, startOfMinute, subDays } from 'date-fns'
import { Chef } from '../state/chefs/hooks'
import {
  getBlock,
  getFactory,
  getMasterChefV2Farms,
  getMasterChefV3Farms,
  getVoltPrice,
  getXVoltPrice
} from './queries'

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

  // const masterChefV2Farms = useMasterChefV2Farms({ shouldFetch })
  // const masterChefV3Farms = useMasterChefV3Farms({ shouldFetch })

  // return useMemo(() => masterChefV2Farms.concat(masterChefV3Farms).filter((pool: any) => pool && pool.pair), [
  //   masterChefV2Farms,
  //   masterChefV3Farms
  // ])

  return useMasterChefV2Farms({ shouldFetch })
}

export function useVoltPrice() {
  const { data } = useSWR('voltPrice', () => getVoltPrice())
  return data
}

export function useXVoltPrice() {
  const { data } = useSWR('xVoltPrice', () => getXVoltPrice())
  return data
}

export function useBlock(variables: any, shouldFetch = true) {
  const { data } = useSWR(shouldFetch ? ['block'] : null, () => getBlock(variables))
  return data
}

export function useOneDayBlock(shouldFetch = true) {
  const date = startOfMinute(subDays(Date.now(), 1))
  const start = getUnixTime(date)
  const end = getUnixTime(addSeconds(date, 600))

  return useBlock(
    {
      timestampFrom: start,
      timestampTo: end
    },
    shouldFetch
  )
}

export function useFactory(variables?: any, shouldFetch = true) {
  const { data } = useSWR(shouldFetch ? ['factory', JSON.stringify(variables)] : null, () => getFactory(variables))
  return data
}
