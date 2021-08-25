import React, { useEffect, useState } from 'react'
import { useApproveCallback } from '../../hooks/useApproveCallback'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'

import { Reward, User } from '../../utils/farm/constants'
import Percentage from './percentage'
import EstimatedRewards from './modal'
import styled from 'styled-components'
import { ChainId, Token, TokenAmount } from '@fuseio/fuse-swap-sdk'
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

const Button = styled(ButtonPrimary)`
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
  opacity: 0.2;
  border-radius: 12px;
  cursor: not-allowed
:hover {
    cursor: not-allowed;
  }
`

interface Deposit {
  depositValue?: string
  user: User
  reward: Reward
}

export default function Deposit(props: Deposit) {
  const addTransaction = useTransactionAdder()
  const { account } = useActiveWeb3React()
  const [depositValue, setdepositValue] = useState('0')
  const [estimate, setEstimate] = useState('0')

  const chainId = 122 as ChainId
  const decimals = 18
  const token = new Token(
    chainId,
    props.reward.contractAddress ? props.reward.contractAddress : '0x1bbB72942E4F73753CA83787411DBed4476A5a7e',
    decimals
  )
  const amount = BigInt(50)

  const token2 = new Token(
    chainId,
    props.reward.LPToken ? props.reward.LPToken : '0x1bbB72942E4F73753CA83787411DBed4476A5a7e',
    18
  )
  const userPoolBalance = useTokenBalance(account ?? undefined, token2)

  function setPercentage(value: string, estimate: string) {
    setEstimate(estimate)
    setdepositValue(value)
  }
  const [approval, approveCallback] = useApproveCallback(
    new TokenAmount(token, amount),
    props.reward.LPToken ? props.reward.LPToken : '0x1bbB72942E4F73753CA83787411DBed4476A5a7e'
  )

  useEffect(() => {
    setEstimate(props.user.rewardEstimate)
    setdepositValue(userPoolBalance ? userPoolBalance.toSignificant(4) : '0')
  }, [props, addTransaction])

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
          value={depositValue}
          placeholder="0"
          onChange={e => setdepositValue(e.target.value)}
        />
        <span>{props.reward.token0.symbol + '-' + props.reward.token1.symbol}</span>
      </InputWrapper>
      <Percentage callBack={setPercentage} user={props.user} />
      <EstimatedRewards estimate={estimate} />
      {approval <= 2 ? (
        <ButtonPrimary
          onClick={() => {
            approveCallback().then(res => console.log(res))
          }}
        >
          {' '}
          Approve
        </ButtonPrimary>
      ) : (
        <ButtonPrimary>Connect Wallet</ButtonPrimary>
      )}

      <div>
        {approval === 3 ? <ButtonPrimary> Deposit {depositValue} tokens</ButtonPrimary> : <Button>Deposit</Button>}
      </div>
    </Container>
  )
}
