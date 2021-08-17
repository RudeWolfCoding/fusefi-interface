import AppBody from '../AppBody'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Filter from '../../components/FarmTable/filter'
import Table from '../../components/FarmTable'
import { getFarmingPools } from '../../utils/farm'
import { useActiveWeb3React } from '../../hooks'

const Wrap = styled('div')`
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 45px;
  display: flex;
  flex-wrap: wrap;
  >h1{
    width: 100%
    text-align:left;

  }
  >p{    text-align:left;

  }
`

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  margin: auto;
  z-index: 3;
  margin-bottom: 120px;
  > div {
    display: flex;
    width: 100%;
  }
`

export default function HomePage() {
  const { library } = useActiveWeb3React()

  const [filter, setFilter] = React.useState<boolean>(true)
  const [farms, setFilterFarms] = React.useState<
    Array<{
      networkId: number
      pairName: string
      LPToken: string
      uniPairToken?: string
      contractAddress: string
      type?: string
      pairs: [string, string]
      totalReward?: number
      start: Date
      end: Date
      duration: number
      isActive: boolean
    }>
  >([])
  const [farmRewards, setFarms] = React.useState<
    Array<{
      networkId: number
      pairName: string
      LPToken: string
      uniPairToken?: string
      contractAddress: string
      type?: string
      pairs: [string, string]
      totalReward?: number
      start: Date
      end: Date
      duration: number
      isActive: boolean
    }>
  >([])

  useEffect(() => {
    getFarmingPools(library).then(res => setFarms([...res]))
    setFilterFarms(farmRewards.filter(i => i.isActive === filter))

    console.log(filter)
  }, [filter, farmRewards])

  return (
    <AppBody>
      <Wrap>
        <h1>FUSE LP Farm</h1>
        <br />
        <p>
          Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and start
          earning Fuse.
        </p>
        <Filter
          active={true}
          callBack={(active: boolean) => {
            setFilter(active)
          }}
        />
        <Container>
          <Table rewards={farms} active={true} />
        </Container>
      </Wrap>
    </AppBody>
  )
}
