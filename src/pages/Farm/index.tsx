import React, { useEffect, useState } from 'react'
import {useFarmPools } from '../../utils/farm'
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
  const [farms, setFarms] = useState<Reward[]>([])
  const farmRewards = useFarmPools()

  useEffect(() => {
    let mounted = true
    farmRewards.then(res => {
      if (mounted) {
        setFarms([...res])
      }
    })
    return () => {
      mounted = false
    }
  }, [farms])

  return (
    <AppBody>
      <Container>
        <h1>FUSE LP Farm</h1>
        <p>
          Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and start
          earning Fuse.
        </p>
        <Table rewards={farms} />
      </Container>
    </AppBody>
  )
}
