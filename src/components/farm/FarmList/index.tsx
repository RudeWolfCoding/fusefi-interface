import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from '../../Loaders/table'
import Filter from './filter'
import FarmListItem from '../FarmListItem'
import { TableWrapper, Table, Th } from '../../Table'
import { FUSE_CHAIN_ID } from '../../../connectors'

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 25px;
`

type FarmListProps = {
  farms: any
  selectedNetwork: any
  isLoading: any
}

export default function FarmList({ farms, isLoading, selectedNetwork }: FarmListProps) {
  const [filter, setFilter] = useState<number>(FUSE_CHAIN_ID)
  return (
    <Wrap>
      <Filter
        chainId={filter}
        callBack={(chainId: number) => {
          setFilter(chainId)
          selectedNetwork(chainId)
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
              <Th style={{ textAlign: 'right' }}>Rewards (Day)</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            ) : farms?.length ? (
              farms
                .filter((farm: any) => farm.networkId === filter)
                .map((farm: any) => <FarmListItem key={farm.contractAddress} farm={farm} />)
            ) : <tr><td></td></tr> }
          </tbody>
        </Table>
      </TableWrapper>
    </Wrap>
  )
}
