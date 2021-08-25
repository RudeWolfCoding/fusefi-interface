import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icon from './icons'
import { Flex } from 'rebass'
import { fetchStats } from '../../utils/farm'
import { useActiveWeb3React } from '../../hooks'
import { Reward, RewardObj } from '../../utils/farm/constants'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover {
    background: #111219;
  }
`
const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

const Column = styled(Flex)`
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

const Button = styled('div')`
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
function toggle(address: string, LP: string) {
  window.location.replace('/#/farm/' + address + '/' + LP)
}

export default function Item({ contract }: any) {
  const { library, account } = useActiveWeb3React()
  const [reward, setReward] = useState<Reward>(RewardObj)
  const [showButon, setshowButon] = useState(false)

  useEffect(() => {
    let mounted = true
    if (library?.provider) {
      fetchStats(
        account ? account : '',
        contract.LPToken,
        contract.contractAddress,
        contract.type,
        library?.provider
      ).then(res => {
        if (mounted) {
          setReward(res)
        }
      })
    }
    return () => {
      mounted = true
    }
  }, [account, contract.LPToken, contract.contractAddress, contract.type, library])

  return (
    <Container onMouseEnter={() => setshowButon(true)} onMouseLeave={() => setshowButon(false)}>
      <Column
        flex={'1 1 25%'}
        margin={'auto'}
        onClick={() => {
          toggle(contract.contractAddress, contract.LPToken)
        }}
      >
        <Icon pairName={contract.pairName} name={contract.pairName} />
      </Column>
      <Column flex={'1 1 20%'}>
        <Field
          style={{
            minWidth: '60px',
            borderRadius: '999px',
            margin: 'auto',
            padding: '0.5rem',
            background: 'linear-gradient(0deg, #d0f7d7, #d0f7d7)'
          }}
        >
          <span
            style={{
              margin: 'auto',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '21px',
              wordSpacing: '0px',
              color: '#4b4b4b'
            }}
          >
            {(reward.rewardsInfo[0].apyPercent * 100).toFixed(0)}%
          </span>
        </Field>
      </Column>
      <Column flex={'1 1 10%'} fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {(Number(reward.reserve0) / 1000000000000000000).toFixed(0)}
          </Field>
          <Field>{reward.token0.symbol}</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {(Number(reward.globalTotalStake) / 1000000000000000000).toFixed(0)}
          </Field>
          <Field>{reward.token1.symbol}</Field>
        </Wrapper>
      </Column>
      <Column flex={'1 1 20%'} fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {Number(reward.globalTotalStakeUSD / 1000).toFixed(0)}
          </Field>
          <Field>USD / day</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {(Number(reward.globalTotalStake) / 1000000000000000000).toFixed(0)}
          </Field>
          <Field>WFUSE / day</Field>
        </Wrapper>
      </Column>
      <Column  flex={'1 1 10%'}>
        {showButon && (
          <Button
            onClick={() => {
              toggle(contract.contractAddress, contract.LPToken)
            }}
          >
            Select
          </Button>
        )}
      </Column>
    </Container>
  )
}
