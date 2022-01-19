import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import ClaimVestingTableRow from './ClaimVestingTableRow'
import { TOKENSWAP_VESTING_ADDRESSES } from '../../constants'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

const Card = styled.div`
  display: flex;
  margin: auto;
  margin: 0.5em;
  padding: 1rem;
  background: black;
  border-radius: 5px;
`

const Main = styled.div`
  position: relative;
  padding: 14px;
  border-radius: 5px;
  min-height: 300px;
  &:before {
    content: '';
    position: absolute;
    top: -17px;
    right: -17px;
    bottom: -17px;
    left: -17px;
    z-index: -1;
    border-radius: 5px;
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
  }
`

export default function ClaimVestingTable() {
  return (
    <Wrapper>
      <Card style={{ background: '#242637', width: '470px' }}>
        <Main style={{ width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
          <Text fontSize={'24px'} marginBottom={'15px'}>
            Round
          </Text>
          {Object.keys(TOKENSWAP_VESTING_ADDRESSES).map((key: string) => (
            <ClaimVestingTableRow key={key} name={key} vestingAddress={TOKENSWAP_VESTING_ADDRESSES[key]} />
          ))}
        </Main>
      </Card>
    </Wrapper>
  )
}
