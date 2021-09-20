import React, { useCallback, useMemo, useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import { ButtonPrimary } from '../../Button'
import EstimatedRewards from './modal'
import Percentage from './percentage'
import styled from 'styled-components'
import { tryFormatAmount } from '../../../utils'
import { TokenAmount } from '@fuseio/fuse-swap-sdk'
import BigNumber from 'bignumber.js'
import { useToken } from '../../../hooks/Tokens'
import { getProgram } from '../../../utils/farm'
import { useTransactionAdder } from '../../../state/transactions/hooks'

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

export default function WithdrawReward({
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
  const { account, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const [withdrawValue, setWithdrawValue] = useState('0')
  const lpToken = useToken(farm?.LPToken)

  const pairSymbol = farm?.token0?.symbol + '-' + farm?.token1?.symbol

  const parsedTotalStake = tryFormatAmount(farm?.totalStaked, 18)
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

    const rewardProgram = getProgram(farm?.contractAddress, library?.provider, farm?.type)
    const response = await rewardProgram.withdraw(parsedAmount.raw.toString(), account)
    const formattedReponse = { ...response, hash: response.transactionHash }

    addTransaction(formattedReponse, {
      summary: `Withdrew from ${pairSymbol} farm`
    })
  }, [account, addTransaction, farm, library, pairSymbol, parsedAmount])

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
      <EstimatedRewards
        title="Accrued Rewards"
        content="Accrued Rewards - Accrued Rewards refers to the total FUSE you've earned for your stake"
        value={tryFormatAmount(farm?.rewardsInfo[0].accuruedRewards, 18)}
      />
      <ButtonPrimary onClick={() => withdraw()}>Withdraw</ButtonPrimary>
    </Container>
  )
}
