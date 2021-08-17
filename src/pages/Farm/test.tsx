import AppBody from '../AppBody'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import Config from '../../constants/abis/config.json'
import { fetchStakingTimes, fetchStats, getFarmingPools, fetchStakerInfo } from '../../utils/farm'

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
  > div {
    display: flex;
    width: 100%;
  }
`

export interface RewardsInfo {
  totalRewardsInUSD: number
  apyPercent: number
}

export interface Token {
  __typename: string
  id: string
  name: string
  symbol: string
}

export interface Rewards {
  globalTotalStake: string
  totalRewards: string
  estimatedRewards: string
  unlockedRewards: string
  accuruedRewards: string
  totalStakedUSD: number
  globalTotalStakeUSD: number
  pairPrice: number
  reserve0: string
  reserve1: string
  lockedRewards: string
  rewardsInfo: RewardsInfo[]
  token0: Token
  token1: Token
}

export default function HomePage() {
  const [result, setresult] = useState({ start: 0, end: 0, duration: 0 })
  const [result2, setresult2] = useState<Rewards>({
    globalTotalStake: '',
    totalRewards: '',
    estimatedRewards: '',
    unlockedRewards: '',
    accuruedRewards: '',
    rewardsInfo: [
      {
        totalRewardsInUSD: 0,
        apyPercent: 0
      }
    ],
    token0: {
      __typename: '',
      id: '',
      name: '',
      symbol: ''
    },
    token1: {
      __typename: '',
      id: '',
      name: '',
      symbol: ''
    },
    totalStakedUSD: 0,
    globalTotalStakeUSD: 0,
    pairPrice: 0,
    reserve0: '',
    reserve1: '',
    lockedRewards: ''
  })

  const { library } = useActiveWeb3React()
  const contractAddress = '0x66B393872d11468A3266E6a6a85328Bc5A6C51bD'
  const account = '0x1bbB72942E4F73753CA83787411DBed4476A5a7e'
  const token = '0x75e24462108E49B71278c93b49B35A5837c0547C'
  const [arr, setArr] = useState<
    {
      pairName: any
      contract: string
      LPToken: any
      rewards: any
      start: Date
      duration: number
      end: Date
      isActive: boolean
    }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStakingTimes(contractAddress, library?.provider, 'single')
      setresult(data)
      const data2 = await fetchStats(account, token, contractAddress, 'single', library?.provider)
      setresult2(data2)
    }

    if (library?.provider) {
      fetchData()
      fetchStakerInfo(
        '0xbCa51ae3896f4033fb7B467BD3ab4A4ff27f3a3E',
        library.provider,
        'multi',
        '0x1bbB72942E4F73753CA83787411DBed4476A5a7e',
        '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'
      ).then(res => {
        console.log(res)
      })
      getFarmingPools(library).then(res => setArr([...res]))
    }
  }, [library])
  return (
    <AppBody>
      <Wrap>
        <Container>
          {arr.length}
          <div>
            Contract: {result2.token0.name + ' ' + result2.token1.name}({contractAddress})
          </div>
          <div>
            Start: {new Date(result.start * 1000).getDate()}/{new Date(result.start * 1000).getUTCMonth() + 1}/
            {new Date(result.start * 1000).getFullYear()}
          </div>
          <div>
            End: {new Date(result.end * 1000).getDate()}/{new Date(result.end * 1000).getMonth() + 1}/
            {new Date(result.end * 1000).getFullYear()}
          </div>
          <div>Duration: {(result.duration * 1000) / 86400000}</div>
          <br />
          <div>Global Total Stake Rewards: {result2.globalTotalStake / 1000000000000000000}</div>
          <div>Global Total Stake RewardsUSD: {result2.globalTotalStakeUSD / 1000000000000000000}</div>
          <div>Total Rewards: {result2.totalRewards / 1000000000000000000}</div>
          <div>Locked Rewards: {result2.lockedRewards / 1000000000000000000}</div>
          <div>Unlocked Rewards: {result2.unlockedRewards / 1000000000000000000}</div>
          <div>Accruded Rewards: {result2.accuruedRewards / 1000000000000000000}</div>
          <div>Total Staked USD: {result2.totalStakedUSD / 1000000000000000000}</div>
          <div>Pair Price: {result2.pairPrice / 1000000000000000000}</div>
          <div>Reserve 0: {result2.reserve0 / 1000000000000000000}</div>
          <div>Reserve 1: {result2.reserve1 / 1000000000000000000}</div>
          <br />
          <div>Total Rewards USD: {result2.rewardsInfo[0].totalRewardsInUSD}</div>
          <div>APY: {result2.rewardsInfo[0].apyPercent * 100}</div>{' '}
          {arr.map(res => {
            return res.pairName
          })}
        </Container>
      </Wrap>
    </AppBody>
  )
}
