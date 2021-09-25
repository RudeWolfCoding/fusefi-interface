import weth from '../../assets/svg/pairs/weth.svg'
import wbtc from '../../assets/svg/pairs/wbtc.svg'
import usdc from '../../assets/svg/pairs/usdc.svg'
import fuse from '../../assets/svg/pairs/fuse.svg'

import styled from 'styled-components'
import React from 'react'
import { FUSE_USDC, FUSE_WBTC, FUSE_WETH } from '../../constants'

interface LendingIconProps {
  address: string
}

export default function LendingIcon({ address }: LendingIconProps) {
  const IconMap = {
    [FUSE_WBTC.address]: wbtc,
    [FUSE_WETH.address]: weth,
    [FUSE_USDC.address]: usdc,
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': fuse
  }

  const NameMap = {
    [FUSE_WBTC.address]: 'WBTC',
    [FUSE_WETH.address]: 'WETH',
    [FUSE_USDC.address]: 'USDC',
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': 'FUSE'
  }

  const Container = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    > img {
      height: 32px;
      margin-right: 12px;
    }
    > span {
      line-height: 50px;
      font-size: 16px;
      font-weight: 400;
    }
  `

  return (
    <Container>
      <img src={IconMap[address]} alt="" />
      <span>{NameMap[address]}</span>
    </Container>
  )
}
