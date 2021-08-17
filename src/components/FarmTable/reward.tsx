import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icon from './icons'
import { Flex } from 'rebass'
import { fetchStats } from '../../utils/farm'
import { useActiveWeb3React } from '../../hooks'
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover {
    font-weight: 800;
    background: #111219;
    opacity: 0.85;
    text-orientation: upright;
  }
`
const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const Item = styled(Flex)`
  text-align: center;
  margin: auto;
  padding-left: 24px;
  line-height: 10px;
  font-size: 1.15rem;
  font-weight: 300;
  flex-wrap: wrap;
`

const Field = styled(Flex)`
  color: grey;
  display: flex;
`

const SelectButton = styled('div')`
  content: 'Select';
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  padding-left: 16px;
  padding-right: 16px;
  transform-origin: right top 0;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
  border-radius: 12px;
  text-align: center;
  margin: auto;
  position: absolute;
  top: 25%;
  right: 15px;
  color: black;
`

export default function Reward(props: { contract: any; active: boolean }) {
  const [showSelectButton, setShowSelectButton] = useState(false)
  function toggle() {
    window.location.replace(
      '/#/farm/' +
        props.contract.contractAddress +
        '/' +
        props.contract.LPToken +
        '/' +
        (result2.rewardsInfo[0].apyPercent * 100).toFixed(0)
    )
  }
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

  const { library, account } = useActiveWeb3React()

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await fetchStats(
        account ? account : '',
        props.contract.LPToken,
        props.contract.contractAddress,
        props.contract.type,
        library?.provider
      )
      setresult2(data2)
    }
    if (library?.provider) {
      fetchData()
    }
  }, [])
  return (
    <Container onMouseEnter={() => setShowSelectButton(true)} onMouseLeave={() => setShowSelectButton(false)}>
      <Item flex={'1 1 25%'} onClick={toggle}>
        <Icon pairName={props.contract.pairName} name={props.contract.pairName} />
      </Item>
      {props.active === true ? (
        <Item flex={'1 1 20%'}>
          <Field
            style={{
              padding: '0.5rem',
              color: '#4b4b4b',
              margin: 'auto',
              borderRadius: '999px',
              background: 'linear-gradient(0deg, #d0f7d7, #d0f7d7)'
            }}
          >
            {(result2.rewardsInfo[0].apyPercent * 100).toFixed(0)}%
          </Field>
        </Item>
      ) : null}
      <Item flex={'1 1 10%'} fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {(Number(result2.reserve0) / 1000000000000000000).toFixed(0)}
          </Field>
          <Field>{result2.token0.symbol}</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {(Number(result2.globalTotalStake) / 1000000000000000000).toFixed(0)}
          </Field>
          <Field>{result2.token1.symbol}</Field>
        </Wrapper>
      </Item>
      <Item flex={'1 1 20%'} fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {Number(result2.globalTotalStakeUSD / 1000).toFixed(0)}
          </Field>
          <Field>USD / day</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {(Number(result2.globalTotalStake) / 1000000000000000000).toFixed(0)}
          </Field>
          <Field>WFUSE / day</Field>
        </Wrapper>
      </Item>
      <Item flex={'1 1 10%'}>{showSelectButton && <SelectButton onClick={toggle}>Select</SelectButton>}</Item>
    </Container>
  )
}
