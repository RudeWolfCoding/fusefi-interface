import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import EstimatedRewards from './modal'
import Percentage from './percentage'
import styled from 'styled-components'
import { withdrawLP } from '../../utils/rewards'
const Container = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  padding-bottom: 14px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
`

const InputWrapper = styled('div')`
  display: flex;
  flex: wrap;
  margin: auto;
  border-radius: 12px;
  padding: 12px;
  border: 2px solid white;
  width: 100%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
  > span {
    margin: auto;
  }
`
const Input = styled('input')`
  display: flex;
  flex: 1;
  font-size: 16px;
  background: none;
  border: none;
  padding: 0.5rem;
  color: white;
  :focus {
    outline: none;
  }
`
const Text = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  text-align: right;
  color: #b5b9d3;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
`

const Balance = styled('div')`
  display: flex;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`

interface RewardProps {
  withdrawValue?: number
  data: {
    lpAvailable: string
    lpApproved: string
    lpBalance: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
    rewardUnlocked: string
  }
  contract: {
    contracta: string
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }
}

export default function WithdrawReward(props: RewardProps) {
  const { library, account } = useActiveWeb3React()
  const [withdrawValue, setWithdrawValue] = useState('1000')
  const [estimate, setEstimate] = useState('1000')

  function setPercentage(value: string, estimate: string) {
    setEstimate(estimate)
    setWithdrawValue(value)
  }

  useEffect(() => {
    setEstimate(props.data.rewardEstimate)
    setWithdrawValue('0')
  }, [props.contract, props.data, library])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        <Balance>
          <span>{props.data.lpBalance} </span> &nbsp; <span>{props.contract.token0 + '-' + props.contract.token1}</span>
        </Balance>
      </Wrapper>
      <InputWrapper>
        <Input
          type="text"
          name="withdrawLP"
          id="withdrawal"
          value={withdrawValue}
          placeholder="0"
          onChange={e => setWithdrawValue(e.target.value)}
        />
        <span>{props.contract.token0 + '-' + props.contract.token1}</span>
      </InputWrapper>
      <Percentage callBack={setPercentage} user={props.data} />
      <EstimatedRewards estimate={estimate} />
      <ButtonPrimary
        onClick={() =>
          withdrawLP(
            props.contract.tokenAddress,
            library,
            '0',
            account ? account : '',
            withdrawValue ? withdrawValue.toString() : '0'
          )
        }
      >
        {' '}
        Withdraw LP Tokens
      </ButtonPrimary>
    </Container>
  )
}
