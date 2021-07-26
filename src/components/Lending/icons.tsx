import weth from '../../assets/svg/pairs/weth.svg'
import wbtc from '../../assets/svg/pairs/wbtc.svg'
import usdc from '../../assets/svg/pairs/usdc.svg'
import fuse from '../../assets/svg/pairs/fuse.svg'

import styled from 'styled-components'
import React from 'react'

export default function LendingIcons(props: { name: string; contract: string }) {
  const Map: { [name: string]: any } = {
    WBTC: wbtc,
    WETH: weth,
    USDC: usdc,
    FUSE: fuse
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
      <img src={Map[props.name]} alt="" />
      <span>{props.name}</span>
    </Container>
  )
}
