import React, { useCallback, useMemo, useState } from 'react'
import { useApproveCallback, ApprovalState } from '../../../hooks/useApproveCallback'
import { useActiveWeb3React } from '../../../hooks'
import { ButtonError, ButtonPrimary } from '../../Button'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { Reward, User } from '../../../utils/farm/constants'
import { useTokenBalance } from '../../../state/wallet/hooks'
import { RowBetween } from '../../Row'
import Percentage from './percentage'
import EstimatedRewards from './modal'
import styled from 'styled-components'
import { useToken } from '../../../hooks/Tokens'
import { TokenAmount } from '@fuseio/fuse-swap-sdk'
import BigNumber from 'bignumber.js'
import { getProgram } from '../../../utils/farm'

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

interface Deposit {
  depositValue?: string
  user: User
  reward: Reward
}

export default function Deposit({
  farm
}: {
  farm?: {
    contractAddress: string
    LPToken: string
    token0: {
      symbol: string
    }
    token1: {
      symbol: string
    }
    type: string
    rewardsInfo: any
    totalStaked: string
  }
}) {
  const addTransaction = useTransactionAdder()
  const { account, library } = useActiveWeb3React()
  const lpToken = useToken(farm?.LPToken)
  const [depositValue, setdepositValue] = useState('0')
  const lpTokenBalance = useTokenBalance(account ?? undefined, lpToken ?? undefined)

  const pairSymbol = farm?.token0?.symbol + '-' + farm?.token1?.symbol

  const parsedAmount = useMemo(() => {
    if (lpToken) {
      const depositValueWei = new BigNumber(depositValue)
        .multipliedBy(10 ** lpToken.decimals)
        .integerValue(BigNumber.ROUND_DOWN)
        .toString()
      return new TokenAmount(lpToken, depositValueWei)
    }
    return undefined
  }, [depositValue, lpToken])

  const [approval, approveCallback] = useApproveCallback(parsedAmount, farm?.contractAddress)

  const deposit = useCallback(async () => {
    if (!farm || !library || !parsedAmount || !account) return

    const rewardProgram = getProgram(farm?.contractAddress, library?.provider, farm?.type)
    const response = await rewardProgram.deposit(parsedAmount.raw.toString(), account)
    const formattedReponse = { ...response, hash: response.transactionHash }

    addTransaction(formattedReponse, {
      summary: `Deposited ${pairSymbol} farm`
    })
  }, [account, addTransaction, library, pairSymbol, parsedAmount, farm])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        {lpTokenBalance && (
          <Balance>
            <span>{lpTokenBalance?.toSignificant()} </span> &nbsp; <span>{pairSymbol}</span>
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
        <span>{pairSymbol}</span>
      </InputWrapper>
      <Percentage selectPerecentage={setdepositValue} value={lpTokenBalance?.toSignificant()} />
      <EstimatedRewards rate={farm?.rewardsInfo[0]?.rewardRate} reward={lpToken} />
      {(approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING) && (
        <RowBetween marginBottom={20}>
          <ButtonPrimary onClick={approveCallback} disabled={approval === ApprovalState.PENDING}>
            {approval === ApprovalState.PENDING ? <span>Approving</span> : 'Approve '}
          </ButtonPrimary>
        </RowBetween>
      )}
      <ButtonError onClick={() => deposit()} disabled={approval !== ApprovalState.APPROVED}>
        Deposit
      </ButtonError>
    </Container>
  )
}
