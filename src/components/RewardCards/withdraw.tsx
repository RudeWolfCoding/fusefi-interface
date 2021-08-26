import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import EstimatedRewards from './modal'
import Percentage from './percentage'
import styled from 'styled-components'
import { withdrawLP } from '../../utils/rewards'
import { Reward, User } from '../../utils/farm/constants'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ChainId, Token } from '@fuseio/fuse-swap-sdk'
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
  const { library, account } = useActiveWeb3React()
  const [withdrawValue, setWithdrawValue] = useState<string | undefined>('0')
  const chainId = 122 as ChainId
  const token = new Token(chainId, props.reward.contractAddress, 18)
  //const LPToken = new Token(chainId, props.reward.LPToken, 18)

  const userPoolBalance = useTokenBalance(account ?? undefined, token)

  function setPercentage(value: string | undefined, estimate: string) {
    setWithdrawValue(value)
  }
  console.log(token)
  console.log(formatUnits(props.reward.rewardsInfo[0].rewardRate.toString(), 15).toString())
  useEffect(() => {
    console.log(props.user.lpDeposited)
    setWithdrawValue(userPoolBalance ? userPoolBalance.toSignificant(4) : '0')
  }, [props, library, userPoolBalance])

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
          value={Number(withdrawValue).toString()}
          placeholder="0"
          onChange={e => setWithdrawValue(e.target.value)}
        />
        <span>{props.reward.token0.symbol + '-' + props.reward.token1.symbol}</span>
      </InputWrapper>
      <Percentage callBack={setPercentage} user={props.user} value={withdrawValue ?? '0'} />
      <EstimatedRewards rate={props.reward.rewardsInfo[0].rewardRate} token={token} />
      <ButtonPrimary
        onClick={() =>
          withdrawLP(
            props.reward.contractAddress,
            account ? account : '0x1bbB72942E4F73753CA83787411DBed4476A5a7e',
            parseUnits(withdrawValue ?? '0').toString(),
            'multi',
            library?.provider
          )
        }
      >
        {' '}
        Withdraw LP Tokens
      </ButtonPrimary>
    </Container>
  )
}
