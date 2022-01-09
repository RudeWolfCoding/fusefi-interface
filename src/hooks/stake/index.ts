import { TokenAmount } from '@fuseio/fuse-swap-sdk'
import { xVOLT } from '../../constants'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { useXVoltContract } from '../useContract'

export function useXVoltTotalSupply() {
  const totalsupply = useSingleCallResult(useXVoltContract(), 'totalSupply')?.result?.[0]
  return totalsupply ? new TokenAmount(xVOLT, totalsupply.toString()) : undefined
}
