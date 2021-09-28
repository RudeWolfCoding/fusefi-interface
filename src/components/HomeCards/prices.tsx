import React, { useCallback } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import useFusePrice from '../../hooks/useFusePrice'
import useFuseswapStats from '../../hooks/useFuseswapStats'
import Card from '../home/Card'
import { uppercaseText } from '../../utils'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 3;
`

export default function HomePrices() {
  const { response: fusePrice } = useFusePrice()
  const { pairCount, totalLiquidityUSD, totalVolumeUSD } = useFuseswapStats()

  const formatNumber = useCallback((value: string) => {
    return numeral(value).format('0.0a')
  }, [])

  return (
    <Wrapper>
      <Card title="Fuse Price" value={`${numeral(fusePrice).format('$0.00a')} USD`} valueDecimals={2} />
      <Card title="Total Liquidity" value={'$' + uppercaseText(formatNumber(totalLiquidityUSD))} />
      <Card title="Total Volume" value={'$' + uppercaseText(formatNumber(totalVolumeUSD))} />
      <Card title="Total Pairs" value={pairCount} />
    </Wrapper>
  )
}
