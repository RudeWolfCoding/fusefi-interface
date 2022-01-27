import { CurrencyAmount, Token } from '@fuseio/fuse-swap-sdk'
import { Contract } from 'ethers'
import { useMemo } from 'react'
// import { useActiveWeb3React } from '.'
import { useSingleCallResult } from '../state/multicall/hooks'
import { tryParseAmount } from '../state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useUserDeadline } from '../state/user/hooks'
// import { useCurrencyBalance } from '../state/wallet/hooks'
// import { useOneToken, useStableSwapPooledTokenIndex } from './Tokens'
import { useStableSwapPooledTokenIndex } from './Tokens'
import { useStableSwapContract } from './useContract'

// function useStableLiquidity(pool: Contract | null, tokenIndex?: number | null) {
//   return useSingleCallResult(pool, 'getTokenBalance', [tokenIndex?.toString()])?.result?.[0]
// }

// function useStablePoolIsPaused(pool: Contract | null) {
//   return useSingleCallResult(pool, 'paused')?.result?.[0]
// }

function useStableSwapRate(
  pool: Contract | null,
  inputIndex?: number | null,
  outputIndex?: number | null,
  inputAmount?: CurrencyAmount
) {
  console.log({inputIndex, outputIndex, inputAmount})
  return useSingleCallResult(pool, 'calculateSwap', [
    inputIndex ?? undefined,
    outputIndex ?? undefined,
    inputAmount?.raw?.toString(),
  ])?.result?.[0]
}

export default function useStableSwapCallback(
  poolAddress: string,
  inputCurrency: Token | undefined,
  outputCurrency: Token | undefined,
  typedValue: string | undefined
): { exactOutput?: CurrencyAmount; inputError?: string; execute?: () => Promise<any> } {
//   const { account } = useActiveWeb3React()
  const pool = useStableSwapContract(poolAddress)
  const inputIndex = useStableSwapPooledTokenIndex(poolAddress, inputCurrency)
  const outputIndex = useStableSwapPooledTokenIndex(poolAddress, outputCurrency)

//   const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
//   const liquidity = useStableLiquidity(pool, outputIndex)
//   const ONE_A = useOneToken(inputCurrency)
  //   const ONE_B = useOneToken(outputCurrency)
//   const oneRate = useStableSwapRate(pool, inputIndex, outputIndex, ONE_A)
  const exactOutput = useStableSwapRate(pool, inputIndex, outputIndex, inputAmount)
//   const isPaused = useStablePoolIsPaused(pool)
  const [deadline] = useUserDeadline()
  const addTransaction = useTransactionAdder()

  return useMemo(() => {
    // if (
    //   !pool ||
    //   //   !balance ||
    //   !inputAmount ||
    //   //   !liquidity ||
    //   //   !oneRate ||
    //   //   !isPaused ||
    //   !exactOutput ||
    //   !inputIndex ||
    //   !outputIndex
    // )
    //   return {}
    // TODO: error message in case low balance
    // TODO: error message in case low liquidity / high slippage
    // TODO: return slippage amount/percentage
    // TODO: error message in case paused
    // TODO: callback to swap
    console.log(exactOutput)
    return {
      exactOutput,
      execute: async () => {
        try {
          const txReceipt = await pool?.swap(
            inputIndex,
            outputIndex,
            inputAmount?.raw.toString(),
            exactOutput?.raw.toString(), // TODO: DANGER!!!! change to acceptable amount
            deadline
          )

          addTransaction(txReceipt, {
            summary: `StableSwap: Swap ${inputAmount?.toSignificant(6)} ${inputCurrency?.symbol} to ${
              outputCurrency?.symbol
            }`,
          })

          return txReceipt
        } catch (error) {
          throw new Error('Could not Stable swap ' + error)
        }
      },
    }
  }, [
    pool,
    // balance,
    addTransaction,
    deadline,
    exactOutput,
    inputAmount,
    inputCurrency,
    inputIndex,
    // isPaused,
    // liquidity,
    // oneRate,
    outputCurrency,
    outputIndex,
  ])
}
