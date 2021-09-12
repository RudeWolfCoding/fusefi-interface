import styled from 'styled-components'
import React from 'react'
import wethfuse from '../../../assets/svg/pairs/WETH-FUSE.svg'
import goodusdc from '../../../assets/svg/pairs/G$-USDC.svg'
import fusdbnb from '../../../assets/svg/pairs/FUSD-BNB.svg'
import fusdfuse from '../../../assets/svg/pairs/FUSD-FUSE.svg'
import wbtcweth from '../../../assets/svg/pairs/WBTC-WETH.svg'
import daiusdt from '../../../assets/svg/pairs/DAI-USDT.svg'
import omusdc from '../../../assets/svg/pairs/OM-USDC.svg'
import usdcfuse from '../../../assets/svg/pairs/USDC-FUSE.svg'
import usdcusdt from '../../../assets/svg/pairs/USDC-USDT.svg'
import wethusdc from '../../../assets/svg/pairs/WETH-USDC.svg'
import linkweth from '../../../assets/svg/pairs/LINK-WETH.svg'
import grtweth from '../../../assets/svg/pairs/GRT-WETH.svg'
import dextfuse from '../../../assets/svg/pairs/DEXT-FUSE.svg'

export default function Icon(props: { name: string; pairName: string }) {
  const FarmIcons: { [name: string]: any } = {
    'G$/USDC': goodusdc,
    'fUSD/BNB': fusdbnb,
    'KNC/USDC': fusdfuse,
    'fUSD/FUSE': fusdfuse,
    'WETH/FUSE': wethfuse,
    'WBTC/WETH': wbtcweth,
    'DAI/USDT': daiusdt,
    'OM/USDC': omusdc,
    'USDC/FUSE': usdcfuse,
    'USDC/USDT': usdcusdt,
    'WETH/USDC': wethusdc,
    'LINK/WETH': linkweth,
    'GRT/WETH': grtweth,
    'DEXT/FUSE': dextfuse
  }

  const Container = styled.div`
    display: flex;
    :hover {
      text-decoration: underline;
    }
    > img {
      height: 42px;
      margin-right: 12px;
    }
    > span {
      cursor: pointer;
      line-height: 40px;
      font-size: 16px;
      font-weight: 400;
    }
  `

  return (
    <Container>
      <img src={FarmIcons[props.pairName]} alt="" />
      <span>{props.name}</span>
    </Container>
  )
}
