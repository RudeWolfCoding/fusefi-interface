import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import Reward from './reward'

const Header = styled('div')`
  display: flex;
  width: 100%;
  flex: wrap;
  font-size: 16px;
`
const Table = styled('div')`
  display: flex;
  flex-wrap: wrap;
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

interface Reward {
  networkId: number
  pairName: string
  LPToken: string
  uniPairToken?: string
  contractAddress: string
  type?: string
  pairs: [string, string]
  totalReward?: number
  start: Date
  end: Date
  duration: number
  isActive: boolean
}

interface RewardsProp {
  active: boolean
  rewards: Reward[]
}

export default function Rewards({ rewards, active }: RewardsProp) {

  return (
    <Table>
      <Header>
        <Item flex={'1 1 46%'}>Farm</Item>
        <Item flex={'1 1 22%'}>APY</Item>
        <Item flex={'1 1 22%'}>TVL</Item>
        <Item flex={'1 1 22%'}>Rewards</Item>
        <Item flex={'1 1 10%'}>&nbsp;</Item>
      </Header>
      {rewards.map((item: { contractAddress: string | null | undefined }) => {
        return <Reward key={item.contractAddress} contract={item} active={true}></Reward>
      })}
    </Table>
  )
}
