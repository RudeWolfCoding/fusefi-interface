import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from '../../Loaders/table'
import Filter from './filter'
import FarmListItem from '../FarmListItem'
import { Farm } from '../../../constants/farms'
import { TableWrapper, Table, Th } from '../../Table'

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 25px;
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
      <TableWrapper>
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
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrap>
  )
}
