import React, { useEffect, useState, useCallback } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import EstimatedRewards from './modal'
import Percentage from './percentage'
import styled from 'styled-components'
import { withdrawLP } from '../../utils/rewards'
import { Reward, User } from '../../utils/farm/constants'
import { parseUnits } from 'ethers/lib/utils'
import { Token } from '@fuseio/fuse-swap-sdk'
import { useTokenBalance } from '../../state/wallet/hooks'

const Container = styled('div')`
text-align:left;
display: flex;
flex-wrap: wrap;
>div{
  width: 100%
  margin-top: 10px;
}
`

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  padding-bottom: 14px;
  margin: auto;
  width: 80%;
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
  width: 80%;
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
  user: User
  reward: Reward
}

export default function WithdrawReward(props: RewardProps) {
  const { library, account, chainId } = useActiveWeb3React()
  const [amount, setAmount] = useState('0')
  const [withdrawValue, setWithdrawValue] = useState<string | undefined>('0')

  const token = new Token(
    chainId ? chainId : 122,
    props.reward.contractAddress ? props.reward.contractAddress : '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
    18
  )

  const userPoolBalance = useTokenBalance(account ?? undefined, token)

  function setPercentage(value: string | undefined) {
    setWithdrawValue(value)
  }

  const withdraw = useCallback(() => {
    if (account && withdrawValue) {
      withdrawLP(
        props.reward.contractAddress,
        account,
        parseUnits(withdrawValue ?? '0').toString(),
        props.reward.type,
        library?.provider
      )
    }
  }, [account, withdrawValue])

  useEffect(() => {
    setWithdrawValue(userPoolBalance ? userPoolBalance.toSignificant(4) : '0')
    setAmount(userPoolBalance ? userPoolBalance.toSignificant(4) : '0')
  }, [props, library])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        {userPoolBalance && (
          <Balance>
            <span>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'} </span> &nbsp;{' '}
            <span>{props.reward.token0.symbol + '-' + props.reward.token1.symbol}</span>
          </Balance>
        )}
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
        <span>{props.reward.token0.symbol + '-' + props.reward.token1.symbol}</span>
      </InputWrapper>
      <Percentage selectPerecentage={setPercentage} user={props.user} value={amount ?? '0'} />
      <EstimatedRewards rate={props.reward.rewardsInfo[0].rewardRate} reward={token} />
      <ButtonPrimary onClick={() => withdraw()}> Withdraw LP Tokens</ButtonPrimary>
    </Container>
  )
}
