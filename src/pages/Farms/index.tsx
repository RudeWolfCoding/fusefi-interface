import React from 'react'
import styled from 'styled-components'
import AppBody from '../AppBody'
import FarmList from '../../components/farm/FarmList'
import { useFarms } from '../../state/farm/hooks'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 45px;
  text-align: left;
`

export default function Farms() {
  const farms = useFarms()

  return (
    <AppBody>
      <Container>
        <h1>FUSE LP Farm</h1>
        <p>
          Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and start
          earning Fuse.
        </p>
        <FarmList farms={farms} />
      </Container>
    </AppBody>
  )
}
