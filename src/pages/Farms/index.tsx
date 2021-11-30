import React from 'react'
import styled from 'styled-components'
import AppBody from '../AppBody'
import FarmList from '../../components/farm/FarmList'
import { useFarms } from '../../state/farm/hooks'
import { FUSE_CHAIN_ID } from '../../connectors'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 45px;
  text-align: left;
`

const Header = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
`

const SubHeader = styled.p`
  font-size: 16px;
  width: 544px;
  max-width: 100%;
  margin-top: 0;
  margin-bottom: 32px;
`

export default function Farms() {
  const [farms, isLoading] = useFarms(FUSE_CHAIN_ID)

  return (
    <AppBody>
      <Container>
        <Header>Farm</Header>
        <SubHeader>Let&apos;s farm FUSE with LP tokens!</SubHeader>
        <FarmList farms={farms} isLoading={isLoading} />
      </Container>
    </AppBody>
  )
}
