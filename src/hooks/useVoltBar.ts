/* eslint-disable @typescript-eslint/no-empty-function */
import { CurrencyAmount } from '@fuseio/fuse-swap-sdk'
import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useXVoltContract } from './useContract'

export default function useVoltBar() {
  const addTransaction = useTransactionAdder()
  const barContract = useXVoltContract()

  const enter = useCallback(
    async (amount?: CurrencyAmount) => {
      if (amount && barContract) {
        try {
          const tx = await barContract.enter(amount.raw.toString())
          addTransaction(tx, { summary: 'Stake Volt' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  const leave = useCallback(
    async (amount?: CurrencyAmount) => {
      if (amount && barContract) {
        try {
          const tx = await barContract.leave(amount.raw.toString())
          addTransaction(tx, { summary: 'UnStake Volt' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  return {
    enter,
    leave
  }
}
