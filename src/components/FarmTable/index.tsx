import React, { useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import Loader from '../Loaders/table'
import { Rewards } from '../../utils/farm/constants'
import Filter from './filter'
import Reward from './reward'

const Wrap = styled('div')`
  margin-bottom: 25px;
`

const Table = styled('div')`
  background: #232638;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`
const Header = styled('div')`
  display: flex;
  flex: wrap;
  font-size: 16px;
`

const Column = styled(Flex)`
  border-bottom: 1px solid black;
  padding-left: 25px;
  text-align: left;
  line-height: 3rem;
`

export default function FarmTable({ rewards }: Rewards) {
  const [filter, setFilter] = useState<boolean>(true)

  return (
    <Wrap>
      <Filter
        active={filter}
        callBack={(active: boolean) => {
          setFilter(active)
        }}
      />
      <Table>
        <Header>
          <Column paddingLeft={'33px'} flex={'1 1 46%'}>Farm</Column>
          <Column flex={'1 1 22%'}>APY</Column>
          <Column flex={'1 1 22%'}>TVL</Column>
          <Column flex={'1 1 22%'}>Rewards</Column>
          <Column flex={'1 1 10%'}>&nbsp;</Column>
        </Header>
        {rewards.length > 0 ? (
          rewards
            .filter(i => i.isActive === filter)
            .map((item: { contractAddress: string | null | undefined }) => {
              return <Reward key={item.contractAddress} contract={item}></Reward>
            })
        ) : (
          <Loader />
        )}
      </Table>
    </Wrap>
  )
}
