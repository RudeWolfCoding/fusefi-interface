import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { getFarmingPools } from '../../utils/farm'
import { Reward } from '../../utils/farm/constants'
import styled from 'styled-components'
import AppBody from '../AppBody'
import Table from '../../components/FarmTable'

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

export default function Farm() {
  const { library } = useActiveWeb3React()
  const [farmRewards, setFarms] = useState<Reward[]>([])

  useEffect(() => {
    let mounted = true
    getFarmingPools(library).then(res => {
      if (mounted) {
        setFarms([...res])
      }
    })
    return () => {
      mounted = false
    }
  }, [library])

  return (
    <AppBody>
      <Container>
        <h1>FUSE LP Farm</h1>
        <p>
          Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and start
          earning Fuse.
        </p>
        <Table rewards={farmRewards} />
      </Container>
    </AppBody>
  )
}
