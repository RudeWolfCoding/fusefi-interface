import React, { useCallback, useMemo, useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import { ButtonPrimary } from '../../Button'
import InfoCard from './farmInfoCard'
import Percentage from './percentage'
import styled from 'styled-components'
import { tryFormatAmount, tryFormatDecimalAmount } from '../../../utils'
import { TokenAmount } from '@fuseio/fuse-swap-sdk'
import BigNumber from 'bignumber.js'
import { useToken } from '../../../hooks/Tokens'
import { getProgram } from '../../../utils/farm'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { Farm } from '../../../constants/farms'

const Container = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  width: 402px;
  max-width: 100%;
  margin: 0 auto;

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

const ClaimButton = styled.button`
  border: 0;
  background: ${({ theme }) => theme.bg8};
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
`

export default function WithdrawReward({ farm }: { farm?: Farm }) {
  const { account, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const [withdrawValue, setWithdrawValue] = useState('0')
  const lpToken = useToken(farm?.LPToken)

  const pairSymbol = farm?.token0?.symbol + '-' + farm?.token1?.symbol
  const parsedTotalStake = tryFormatAmount(farm?.totalStaked, 18)
  const accuruedRewards = farm?.rewardsInfo ? tryFormatDecimalAmount(farm?.rewardsInfo[0].accuruedRewards, 18, 2) : '0'
  const showWithdrawButton = Number(accuruedRewards) > 0

  const parsedAmount = useMemo(() => {
    if (lpToken && withdrawValue) {
      const withdrawValueWei = new BigNumber(withdrawValue)
        .multipliedBy(10 ** lpToken.decimals)
        .integerValue(BigNumber.ROUND_DOWN)
        .toString()
      return new TokenAmount(lpToken, withdrawValueWei)
    }
    return undefined
  }, [withdrawValue, lpToken])

  const withdraw = useCallback(async () => {
    if (!farm || !library || !parsedAmount || !account) return
    try {
      const rewardProgram = getProgram(farm?.contractAddress, library?.provider, farm?.type)
      const response = await rewardProgram.withdraw(parsedAmount.raw.toString(), account)
      const formattedReponse = { ...response, hash: response.transactionHash }

      addTransaction(formattedReponse, {
        summary: `Withdrew from ${pairSymbol} farm`
      })
    } catch (e) {
      console.error(e)
    }
  }, [account, addTransaction, farm, library, pairSymbol, parsedAmount])

  const claim = useCallback(async () => {
    if (!farm || !library || !account) return

    try {
      const rewardProgram = getProgram(farm?.contractAddress, library?.provider, farm?.type)
      const response = await rewardProgram.withdrawReward(account)
      const formattedReponse = { ...response, hash: response.transactionHash }

      addTransaction(formattedReponse, { summary: `Rewards Claimed` })
    } catch (e) {
      console.error(e)
    }
  }, [account, addTransaction, farm, library])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        {parsedTotalStake && (
          <Balance>
            <span>{parsedTotalStake || '-'} </span> &nbsp; <span>{pairSymbol}</span>
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
        <span>{pairSymbol}</span>
      </InputWrapper>
      <Percentage selectPerecentage={setWithdrawValue} value={parsedTotalStake} />
      <InfoCard
        title="Accrued Rewards"
        content="Accrued Rewards - Accrued Rewards refers to the total FUSE you've earned for your stake"
        value={accuruedRewards}
        button={showWithdrawButton && <ClaimButton onClick={() => claim()}>Claim</ClaimButton>}
      />
      <ButtonPrimary onClick={() => withdraw()}>Withdraw</ButtonPrimary>
    </Container>
  )
}
