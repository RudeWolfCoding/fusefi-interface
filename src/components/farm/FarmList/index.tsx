import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from '../../Loaders/table'
import Filter from './filter'
import FarmListItem from '../FarmListItem'
import { Farm } from '../../../constants/farms'

const Wrap = styled.div`
  margin-bottom: 25px;
`

const Table = styled.table`
  background: #232638;
  border-radius: 16px;
  font-size: 16px;
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  border-bottom: 1px solid ${({ theme }) => theme.secondary4};
  padding 12px 16px;
  font-weight: 500;
`

type FarmListProps = {
  farms: Array<Farm>
}

export default function FarmList({ farms }: FarmListProps) {
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
        <thead>
          <tr>
            <Th>Farm</Th>
            <Th style={{ textAlign: 'center' }}>APY</Th>
            <Th style={{ textAlign: 'right' }}>Total Staked</Th>
            <Th style={{ textAlign: 'right' }}>TVL</Th>
            <Th style={{ textAlign: 'right' }}>Rewards</Th>
            <Th>&nbsp;</Th>
          </tr>
        </thead>
        <tbody>
          {farms.length > 0 ? (
            farms
              .filter(farm => !farm.isExpired === filter)
              .map(farm => <FarmListItem key={farm.contractAddress} farm={farm} />)
          ) : (
            <Loader />
          )}
        </tbody>
      </Table>
    </Wrap>
  )
}
