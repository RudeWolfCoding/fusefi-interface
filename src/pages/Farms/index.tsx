import React from 'react'
import styled from 'styled-components'
import AppBody from '../AppBody'
import Filter from '../../components/farm/FarmList/filter'
import FarmList from '../../components/farm/FarmList'
import { useLocation } from 'react-router'

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
  margin: 0px;
`

const SubHeader = styled.div`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
`
export default function Farms() {
  const  { pathname } = useLocation()
  const networkId = pathname.split('/')[2]

  return (
    <AppBody>
      <Container>
          <Wrapper>
            <div>
              <Header>Farm</Header>
              <SubHeader>Let&apos;s farm FUSE with your LP tokens!</SubHeader>
            </div>
            <Filter network={networkId}/>
          </Wrapper>
          <FarmList networkId={networkId}/>
      </Container>
    </AppBody>
  )
}