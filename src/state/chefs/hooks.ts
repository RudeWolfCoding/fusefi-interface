import { ChainId } from '@fuseio/fuse-swap-sdk'
import useSWR from 'swr'
import { MASTERCHEF_V2_ADDRESS, MASTERCHEF_V3_ADDRESS } from '../../constants'
import { getMasterChefV2Pool, getMasterChefV3Pool } from '../../graphql/queries'

export enum Chef {
  MASTERCHEF_V2,
  MASTERCHEF_V3
}

export function useChefV2Pool(pid?: string) {
  const { data } = useSWR(pid ? ['masterChefV2Pool', pid] : null, (_, pid) => getMasterChefV2Pool(pid))
  if (!data) return
  return { ...data, type: 'chef', chef: Chef.MASTERCHEF_V2 }
}

export function useChefV3Pool(pid?: string) {
  const { data } = useSWR(pid ? ['masterChefV3Pool', pid] : null, (_, pid) => getMasterChefV3Pool(pid))
  if (!data) return
  return { ...data, type: 'chef', chef: Chef.MASTERCHEF_V3 }
}

export function useChefPool(pid?: string, chefAddress?: string) {
  let chef: Chef | undefined
  if (MASTERCHEF_V2_ADDRESS[ChainId.FUSE] === chefAddress) {
    chef = Chef.MASTERCHEF_V2
  } else if (MASTERCHEF_V3_ADDRESS[ChainId.FUSE] === chefAddress) {
    chef = Chef.MASTERCHEF_V3
  } else {
    chef = undefined
  }

  const usePool = chef === Chef.MASTERCHEF_V2 ? useChefV2Pool : useChefV3Pool
  const pool = usePool(pid)

  return pool
}
