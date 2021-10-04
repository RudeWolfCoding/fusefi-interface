import { useEffect, useMemo, useState } from 'react'
import { isObjectEmpty, calculateApy } from '../../utils'
import { getMarketAddresses, getMarketPrices, getMarketsData } from '../../utils/lending'

export interface Market {
  priceUSD: number
  borrowBalance: number
  supplyBalance: number
  supplyApy: number
  borrowApy: number
  liquidity: number
  underlyingAssetAddress: any
}

function useMarketAddersses(): Array<string> {
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    getMarketAddresses().then(setAddresses)
  }, [])

  return addresses
}

function useMarketPrices(marketAddresses: Array<string>) {
  const [prices, setPrices] = useState<any>({})

  useEffect(() => {
    getMarketPrices(marketAddresses).then(setPrices)
  }, [marketAddresses])

  return prices
}

function useMarketsData(marketAddresses: Array<string>) {
  const [marketsData, setMarketsData] = useState<any>({})

  useEffect(() => {
    getMarketsData(marketAddresses).then(setMarketsData)
  }, [marketAddresses])

  return marketsData
}

export function useLendingMarkets() {
  const marketAddresses = useMarketAddersses()
  const marketPrices = useMarketPrices(marketAddresses)
  const marketsData = useMarketsData(marketAddresses)

  return useMemo((): Array<Market> => {
    return !isObjectEmpty(marketsData) && !isObjectEmpty(marketPrices)
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
