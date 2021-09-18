import React, { useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useApproveCallback, ApprovalState } from '../../../hooks/useApproveCallback'
import { useActiveWeb3React } from '../../../hooks'
import { ButtonError, ButtonPrimary } from '../../Button'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { Reward, User } from '../../../utils/farm/constants'
import { useTokenBalance } from '../../../state/wallet/hooks'
import { RowBetween } from '../../Row'
import Percentage from './percentage'
import RewardCard from './modal'
import styled from 'styled-components'
import { useToken } from '../../../hooks/Tokens'
import { TokenAmount } from '@fuseio/fuse-swap-sdk'
import BigNumber from 'bignumber.js'
import { getProgram } from '../../../utils/farm'
import { Farm } from '../../../constants/farms'
import { tryFormatDecimalAmount } from '../../../utils'

const Container = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }
`

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  margin: auto;
  width: 80%;
  margin-bottom: 4px;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
`

const InputWrapper = styled('div')`
  display: flex;
  flex: wrap;
  margin: auto;
  border-radius: 12px;
  margin-bottom: 8px;
  padding: 0 16px;
  border: 2px solid white;
  height: 48px;
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

export default function Deposit({ farm }: { farm?: Farm }) {
  const addTransaction = useTransactionAdder()
  const { account, library } = useActiveWeb3React()
  const lpToken = useToken(farm?.LPToken)
  const [depositValue, setdepositValue] = useState('0')
  const lpTokenBalance = useTokenBalance(account ?? undefined, lpToken ?? undefined)

  const pairSymbol = farm?.token0?.symbol + '-' + farm?.token1?.symbol

  const parsedAmount = useMemo(() => {
    if (lpToken && depositValue) {
      const depositValueWei = new BigNumber(depositValue)
        .multipliedBy(10 ** lpToken.decimals)
        .integerValue(BigNumber.ROUND_DOWN)
        .toString()
      return new TokenAmount(lpToken, depositValueWei)
    }
    return undefined
  }, [depositValue, lpToken])

  const rewardsPerToken = useMemo(() => {
    if (farm) {
      const time = farm?.end ? farm?.end - dayjs().unix() : '0'
      const rewardRate = farm?.rewardsInfo ? farm?.rewardsInfo[0].rewardRate : '0'

      return new BigNumber(time)
        .multipliedBy(rewardRate)
        .dividedBy(new BigNumber(farm?.globalTotalStake ?? '0').plus(parsedAmount?.toSignificant() ?? '0'))
        .toString()
    }
    return '0'
  }, [farm, parsedAmount])

  const estimatedReward = useMemo(() => {
    return new BigNumber(rewardsPerToken)
      .multipliedBy(new BigNumber(parsedAmount?.raw.toString() ?? '0').plus(farm?.totalStaked ?? '0'))
      .toFixed(6)
  }, [farm, parsedAmount, rewardsPerToken])

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
      <RewardCard title="Estimated Rewards" value={tryFormatDecimalAmount(estimatedReward, 18)} />
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
