import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import Apy from '../../components/RewardCards/info'
import vector from '../../assets/svg/vector.svg'
import deposits from '../../assets/svg/deposits.svg'
import rewards from '../../assets/svg/rewardsAcc.svg'
import Icon from '../../components/FarmTable/icons'
import apyPurple from '../../assets/svg/questionmark.svg'
import apyBlue from '../../assets/svg/questionmark2.svg'
import apyGreen from '../../assets/svg/questionmark3.svg'
import Reselect from '../../components/RewardCards'
import { useActiveWeb3React } from '../../hooks'
import Config from '../../constants/abis/config.json'
import { fetchStakerInfo, fetchStats } from '../../utils/farm'
import { getLPBalance } from '../../utils/rewards'

const Container = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 24%;
  padding-right: 24%;
  margin-bottom: 50px;
  text-align: left;
  z-index: 3;
  > span {
    font-size: 32px;
    font-weight: 600;
    line-height: 38px;
  }
`

const Wrapper = styled('div')`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  > span {
    line-height: 54px;
    font-size: 32px;
    font-weight: 500;
  }
`
const Item = styled('div')`
  padding: 4px;
  width: 33%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export interface RewardsInfo {
  totalRewards: number
  rewardRate: number
  totalRewardsInUSD: number
  apyPercent: number
  accuruedRewards: number
}

export interface Token {
  __typename: string
  id: string
  name: string
  symbol: string
}

export interface Rewards {
  pairName: string
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

export default function FarmReselect(props: RouteComponentProps<{ contracta: string; LPToken: string; APY: string }>) {
  const {
    match: {
      params: { contracta, LPToken }
    }
  } = props
  const [result, setResult] = useState<any>({
    res: [],
    lpDeposited: '0',
    rewardsTotal: '0',
    lpUser: '0',
    lpBalance: '0',
    rewardAcruded: '0',
    rewardsUnlocked: '0'
  })
  const [allContracts] = useState([])
  const [result2, setresult2] = useState<Rewards>({
    globalTotalStake: '',
    totalRewards: '',
    pairName: '',
    estimatedRewards: '',
    unlockedRewards: '',
    accuruedRewards: '',
    rewardsInfo: [
      {
        rewardRate: 0,
        totalRewards: 0,
        totalRewardsInUSD: 0,
        apyPercent: 0,
        accuruedRewards: 0
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

  const { account, library } = useActiveWeb3React()
  const obj: { [index: string]: any } = Config[0].contracts.fuse

  useEffect(() => {
    getLPBalance(obj[contracta].LPToken, account).then(res => {
      setResult({ ...result, lpBalance: res })
    })
    getLPBalance(obj[contracta].LPToken, account).then(res => {
      setResult({ ...result, lpBalance: res })
    })

    fetchStakerInfo(
      contracta,
      library?.provider,
      'multi',
      account ? account : '',
      '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'
    ).then(res =>
      setResult({
        ...result,
        lpDeposited: (res[0] / 1000000000000000000).toFixed(2),
        lpBalance: (res[0] / 1000000000000000000).toFixed(2)
      })
    )

    fetchStats(
      account ? account : '',
      obj[contracta].LPToken,
      obj[contracta].contractAddress,
      obj[contracta].type,
      library?.provider
    ).then(res => setresult2(res))
  }, [allContracts, contracta, account])

  return (
    <AppBody>
      <Container>
        <Wrapper style={{ paddingBottom: '25px' }}>
          <Icon name={''} pairName={obj[contracta].pairName} /> <span>{obj[contracta].pairName}</span>
        </Wrapper>
        <Wrapper>
          <Item>
            <Apy
              title={'Deposit APY'}
              data={(result2.rewardsInfo[0].apyPercent * 100).toFixed(2) + '%'}
              icon={vector}
              apyIcon={apyPurple}
              txt={'#8E6CC0'}
              color={'#473660'}
            />{' '}
          </Item>
          <Item>
            <Apy
              title={'Your Deposits'}
              data={result.lpDeposited}
              apyIcon={apyBlue}
              label={obj[contracta].pairName}
              icon={deposits}
              txt={'#0684A6'}
              color={'#034253'}
            />
          </Item>
          <Item>
            <Apy
              title={'Accruded Rewards'}
              data={(result2.rewardsInfo[0].accuruedRewards / 1000000000000000000).toFixed(2)}
              apyIcon={apyGreen}
              label={'WFUSE'}
              icon={rewards}
              txt={'#1C9E7E'}
              color={'#0E4F3F'}
            />
          </Item>
        </Wrapper>
        <Wrapper style={{ paddingLeft: '4px', paddingRight: '10px' }}>
          <Reselect
            result={result}
            contract={{
              stakingContractAddress: contracta,
              tokenAddress: LPToken,
              user: account || '',
              token0: obj[contracta].token0,
              token1: obj[contracta].token1
            }}
          />
        </Wrapper>
      </Container>
    </AppBody>
  )
}
