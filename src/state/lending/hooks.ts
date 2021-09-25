import { useMemo } from 'react'
import { useComptrollerContract, useLensContract } from '../../hooks/useContract'
import useContractCallStatic from '../../hooks/useContractCallStatic'
import { useSingleCallResult } from '../multicall/hooks'

export interface Market {
  priceUSD: number
  borrowBalance: number
  supplyBalance: number
  supplyApy: number
  borrowApy: number
  liquidity: number
  underlyingAssetAddress: any
}

function calculateApy(ratePerBlock: any) {
  const ethMantissa = 1e18
  const blocksPerDay = 86400 / 5
  const daysPerYear = 365
  return (Math.pow((ratePerBlock / ethMantissa) * blocksPerDay + 1, daysPerYear) - 1) * 100
}

function useMarketAddersses(): Array<string> {
  const comptrollerContract = useComptrollerContract()
  const { result } = useSingleCallResult(comptrollerContract, 'getAllMarkets')

  return useMemo(() => {
    return result ? result[0] : []
  }, [result])
}

function useMarketPrices(marketAddresses: Array<string>) {
  const compoundLensContract = useLensContract()

  const { result } = useSingleCallResult(compoundLensContract, 'cTokenUnderlyingPriceAll', [marketAddresses])

  return useMemo(() => {
    return result
      ? result[0].reduce((memo: any, result: any) => {
          memo[result.cToken] = result.underlyingPrice
          return memo
        }, {})
      : {}
  }, [result])
}

function useMarketsData(marketAddresses: Array<string>) {
  const compoundLensContract = useLensContract()

  const result: any = useContractCallStatic(compoundLensContract, 'cTokenMetadataAll', marketAddresses)

  return useMemo(() => {
    return result
      ? result.reduce((memo: any, result: any) => {
          memo[result.cToken] = result
          return memo
        }, {})
      : {}
  }, [result])
}

export function useLendingMarkets() {
  const marketAddresses = useMarketAddersses()
  const marketPrices = useMarketPrices(marketAddresses)
  const marketsData = useMarketsData(marketAddresses)

  return useMemo((): Array<Market> => {
    return Object.keys(marketsData) && Object.keys(marketPrices)
      ? marketAddresses.map((market: string) => {
          const marketData = marketsData[market]
          const underlyingPrice = marketPrices[market]
          const {
            exchangeRateCurrent,
            supplyRatePerBlock,
            borrowRatePerBlock,
            totalBorrows,
            totalSupply,
            totalCash,
            underlyingDecimals,
            cTokenDecimals,
            underlyingAssetAddress
          } = marketData

          const priceUSD = underlyingPrice / Math.pow(10, 36 - underlyingDecimals)
          const borrowBalance = (totalBorrows / Math.pow(10, underlyingDecimals)) * priceUSD
          const supplyBalance =
            (totalSupply / Math.pow(10, cTokenDecimals)) *
            (exchangeRateCurrent / Math.pow(10, 18 + (underlyingDecimals - cTokenDecimals))) *
            priceUSD
          const supplyApy = calculateApy(supplyRatePerBlock)
          const borrowApy = calculateApy(borrowRatePerBlock)
          const liquidity = (totalCash / Math.pow(10, underlyingDecimals)) * priceUSD

          return {
            priceUSD,
            borrowBalance,
            supplyBalance,
            supplyApy,
            borrowApy,
            liquidity,
            underlyingAssetAddress
          }
        })
      : []
  }, [marketAddresses, marketsData, marketPrices])
}
