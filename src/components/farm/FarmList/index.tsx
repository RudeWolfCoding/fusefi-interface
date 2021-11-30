import React from 'react'
import styled from 'styled-components'
import Loader from '../../Loaders/table'
import FarmListItem from '../FarmListItem'
import { TableWrapper, Table, Th } from '../../Table'
// import { RouteComponentProps } from 'react-router-dom'
import { useFarms } from '../../../state/farm/hooks'
// import { FUSE_CHAIN_ID } from '../../../connectors'

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 25px;
`

export default function FarmList({ networkId } : any ) {

  const [farms, isLoading] = useFarms()

  return (
    <Wrap>
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
                .filter((farm: any) => farm.networkId == networkId && !farm.isExpired)
                .map((farm: any) => <FarmListItem key={farm.contractAddress} farm={farm} />)
            ) : <tr><td></td></tr> }
          </tbody>
        </Table>
      </TableWrapper>
    </Wrap>
  )
}
