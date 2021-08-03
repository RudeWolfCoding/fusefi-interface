import AppBody from '../AppBody'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { NETWORK_URL } from '../../connectors'
import { SingleRewardProgram } from '@fuseio/rewards-sdk'

const Wrap = styled('div')`
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 45px;
  display: flex;
  flex-wrap: wrap;
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
`

const fetchStakingTimes = async () => {
  const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL)
  const staking = new SingleRewardProgram('0xB06Eb970a623AbEd8630bbb6B11a6071A352A554', provider)
  const { start, duration, end } = await staking.getStakingTimes()
  return { start, duration, end }
}

export default function HomePage() {
  const [result, setresult] = useState({ start: 0, end: 0, duration: 0 })
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStakingTimes()
      setresult(data)
    }

    fetchData()
  }, [])
  return (
    <AppBody>
      <Wrap>
        <Container>
          <div>Start: {result.start}</div>
        </Container>
      </Wrap>
    </AppBody>
  )
}
