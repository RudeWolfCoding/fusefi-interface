import React, { useState } from 'react'
import styled from 'styled-components'
import AppBody from '../AppBody'
import FarmList from '../../components/farm/FarmList'
import { useFarms } from '../../state/farm/hooks'
import { BINANCE_CHAIN_ID, ETHEREUM_CHAIN_ID, FUSE_CHAIN_ID } from '../../connectors'

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
  const [fuseFarms, isLoading] = useFarms(FUSE_CHAIN_ID)
  const [bscFarms] = useFarms(BINANCE_CHAIN_ID)
  const [ethFarms] = useFarms(ETHEREUM_CHAIN_ID)
  const [network, setNetwork] = useState(FUSE_CHAIN_ID)
  let farms: any

  switch (network) {
    case ETHEREUM_CHAIN_ID:
      farms = ethFarms
      break
    case BINANCE_CHAIN_ID:
      farms = bscFarms
      break
    case FUSE_CHAIN_ID:
      farms = fuseFarms
      break
  }

  return (
    <AppBody>
      <Container>
        <Header>Farm</Header>
        <SubHeader>Let&apos;s farm FUSE and VOLTS with your LP tokens!</SubHeader>
        <FarmList farms={farms} isLoading={isLoading} selectedNetwork={(chainId: number) => setNetwork(chainId)} />
      </Container>
    </AppBody>
  )
}
