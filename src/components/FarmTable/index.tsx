import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import Reward from './reward'

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  font-size: 16px;
`
const Container = styled('div')`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  background: #232638;
  border-radius: 16px;
`

const Item = styled(Flex)`
  line-height: 3rem;
  border-bottom: 1px solid black;
  padding-left: 25px;
  text-align: left;
`
interface RewardStats {
  address: string
  contractAddress: string
  token0: string
  token1: string
  pairs: [string]
  apy: string
  duration: number
  start: Date
  end: Date
  rewards: number
  token0Pool: number
  token1Pool: number
}

interface RewardsProps {
  rewards: RewardStats[]
}

export default function Rewards({ rewards }: RewardsProps) {
  return (
    <Container>
      <Wrapper>
        <Item flex={'1 1 46%'}>Farm</Item>
        <Item flex={'1 1 22%'}>APY</Item>
        <Item flex={'1 1 22%'}>TVL</Item>
        <Item flex={'1 1 22%'}>Rewards</Item>
        <Item flex={'1 1 10%'}>&nbsp;</Item>
      </Wrapper>
      {rewards.map(item => {
        return <Reward key={item.contractAddress} contract={item} active={true} />
      })}
    </Container>
  )
}
