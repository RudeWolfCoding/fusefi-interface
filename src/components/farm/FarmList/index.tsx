import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from '../../Loaders/table'
import Filter from './filter'
import FarmListItem from '../FarmListItem'
import { Farm } from '../../../constants/farms'
import { TableWrapper, Table, Th } from '../../Table'
import { FUSE_CHAIN_ID } from '../../../connectors'

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 25px;
`

type FarmListProps = {
  farms: Array<Farm>
  setChainId: any
}

export default function FarmList({ farms, setChainId }: FarmListProps) {
  const [filter, setFilter] = useState<number>(FUSE_CHAIN_ID)
  return (
    <Wrap>
      <Filter
        chainId={filter}
        callBack={(chainId: number) => {
          setFilter(chainId)
          setChainId(chainId)
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
            {farms.length > 0 ? (
              farms
                .filter(farm => (farm.networkId === filter))
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
