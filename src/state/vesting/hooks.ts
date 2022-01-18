import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { TOKENSWAP_VESTING_ADDRESSES } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useVestingContract } from '../../hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from '../multicall/hooks'

export function useVestingIds(vestingAddress?: string, account?: string) {
  const vestingContract = useVestingContract(vestingAddress)
  const claimIdsResult = useSingleCallResult(vestingContract, 'getActiveGrants', [account])

  return useMemo(() => {
    return claimIdsResult.result?.[0]
  }, [claimIdsResult.result])
}

export function useVestingClaims(vestingAddress?: string, account?: string) {
  const vestingIds = useVestingIds(vestingAddress, account)
  const vestingContract = useVestingContract(vestingAddress)
  const userClaims = useSingleContractMultipleData(
    vestingContract,
    'tokenGrants',
    vestingIds ? vestingIds.map((id: any) => [id]) : undefined
  )

  return useMemo(
    () =>
      vestingIds &&
      vestingIds.reduce((memo: any, vestingId: any, index: any) => {
        memo[vestingId] = userClaims?.[index]?.result
        return memo
      }, {}),
    [userClaims, vestingIds]
  )
}

export function useVestingUnclaimedAmounts(vestingAddress?: string, account?: string) {
  const vestingIds = useVestingIds(vestingAddress, account)
  const vestingContract = useVestingContract(vestingAddress)
  const unclaimedAmounts = useSingleContractMultipleData(
    vestingContract,
    'calculateGrantClaim',
    vestingIds ? vestingIds.map((id: any) => [id]) : undefined
  )

  return useMemo(
    () =>
      vestingIds
        ? vestingIds.reduce((memo: any, vestingId: any, index: any) => {
            memo[vestingId] = unclaimedAmounts[index]?.result?.[1]
            return memo
          }, {})
        : {},
    [unclaimedAmounts, vestingIds]
  )
}

export function useVestingTotalUnclaimedAmounts(vestingAddress?: string, account?: string) {
  const unclaimedAmounts = useVestingUnclaimedAmounts(vestingAddress, account)

  return useMemo(() => {
    return Object.values(unclaimedAmounts).reduce((memo: any, amount: any) => memo?.add(amount ?? 0), BigNumber.from(0))
  }, [unclaimedAmounts])
}

export function useVestingClaimableIds(vestingAddress?: string, account?: string) {
  const unclaimedAmounts = useVestingUnclaimedAmounts(vestingAddress, account)

  return Object.keys(unclaimedAmounts)
    .map((key: any) => (unclaimedAmounts?.[key]?.gt(0) ? key : undefined))
    .filter(Boolean)
}

export function useVestingTotalUnclaimedAmount() {
  const { account } = useActiveWeb3React()
  const [swapAClaimableAmount] = [useVestingTotalUnclaimedAmounts(TOKENSWAP_VESTING_ADDRESSES.A, account ?? undefined)]
  return swapAClaimableAmount as any
}
