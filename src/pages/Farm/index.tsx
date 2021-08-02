import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AppBody from '../AppBody'
import Filter from '../../components/FarmTable/filter'
import Table from '../../components/FarmTable'
import { getFarmingPools } from '../../utils/farm'

const Container = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 10%;
  padding-right: 10%;
  text-align: left;
  z-index: 3;
  margin-bottom: 20px;
  > span {
    max-width: 500px;
  }
`

const Header = styled('div')`
  max-width: 545px;
`

export default function Farm() {
  const [farmRewards] = useState([...getFarmingPools()])
  const [filteredRewards, setfilteredRewards] = useState(farmRewards.filter(e => e.end > new Date()))
  const [isActive, setisActive] = useState(false)

  useEffect(() => {
    setisActive(true)
  }, [farmRewards, isActive])

  function setFilter(active: boolean) {
    if (active) {
      setfilteredRewards(farmRewards.filter(e => e.end > new Date()))
    } else {
      setfilteredRewards(farmRewards.filter(e => e.end < new Date()))
    }
    setisActive(active)
  }

  return (
    <AppBody>
      <Container>
        <Header>
          <h1>Fuse LP Farm</h1>
          <span>
            Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and
            start earning Fuse.
          </span>
        </Header>
        <Filter
          active={true}
          callBack={(active: boolean) => {
            setFilter(active)
          }}
        />
        <Table rewards={filteredRewards} />
      </Container>
    </AppBody>
  )
}
