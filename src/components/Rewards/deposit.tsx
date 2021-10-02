import React, { useEffect, useState } from 'react'
import { approveLP, depositLP } from '../../utils/getReward'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import EstimatedRewards from './estimatedRewards'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { TransactionResponse } from '@ethersproject/providers'

const Container = styled('div')`
text-align:left;
display: flex;
flex-wrap: wrap;
>div{
  width: 100%
  margin-top: 10px;
}
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

const PrecentageWrapper = styled('div')`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  flex: wrap;
  padding-bottom: 24px;
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

const Percentage = styled('button')`
  margin: 2px;
  padding: 4px;
  display: inline-block;
  text-align: center;
  justify-content: flex-end;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  width: 100%;
  border-radius: 999px;
  border: solid 2px white;
  background: none;
`
interface Deposit {
  withdrawValue?: string
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
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }
}

export default function Deposit(props: Deposit) {
  const [withdrawValue, setWithdrawValue] = useState(props.withdrawValue)
  const addTransaction = useTransactionAdder()

  const [contract, setContract] = useState<{
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }>({ stakingContractAddress: '', tokenAddress: '', user: '', token0: '', token1: '' })
  const [result, setResult] = useState<{
    lpAvailable: string
    lpApproved: string
    lpBalance: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
    rewardUnlocked: string
  }>({
    lpAvailable: '0',
    lpApproved: '0',
    lpBalance: '0',
    rewardUnlockedUser: '0',
    rewardEstimate: '0',
    rewardTotal: '0',
    rewardUnlocked: '0'
  })
  const [estimate, setEstimate] = useState('0')

  const { library, account } = useActiveWeb3React()

  function selectPercentage(amount: number) {
    const calculated = (Number(result.lpAvailable) * amount) / 100
    const rewards =
      Number(result.rewardEstimate) +
      (Number(result.rewardEstimate) / Number(result.lpBalance)) * ((Number(result.lpAvailable) * amount) / 100)
    setEstimate(rewards.toFixed(2).toString())
    setWithdrawValue(calculated.toString())
  }

  useEffect(() => {
    setEstimate(result.rewardEstimate)
    setWithdrawValue('0')
    setContract(props.contract)
    setResult(props.data)
  }, [props, addTransaction, result.rewardEstimate])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        <Balance>
          <span>{result.lpAvailable} </span> &nbsp; <span>{contract.token0 + '-' + contract.token1}</span>
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
        <span>{contract.token0 + '-' + contract.token1}</span>
      </InputWrapper>
      <PrecentageWrapper>
        <Percentage
          onClick={() => {
            selectPercentage(25)
          }}
        >
          {' '}
          25%{' '}
        </Percentage>
        <Percentage
          onClick={() => {
            selectPercentage(50)
          }}
        >
          {' '}
          50%{' '}
        </Percentage>
        <Percentage
          onClick={() => {
            selectPercentage(75)
          }}
        >
          {' '}
          75%{' '}
        </Percentage>
        <Percentage
          onClick={() => {
            selectPercentage(100)
          }}
        >
          {' '}
          <span>100%</span>{' '}
        </Percentage>
      </PrecentageWrapper>
      <EstimatedRewards estimate={estimate} />
      {account ? (
        <ButtonPrimary
          onClick={() =>
            approveLP(
              contract.stakingContractAddress,
              contract.tokenAddress,
              contract.user,
              library,
              withdrawValue
            ).then((response: TransactionResponse) => {
              addTransaction(response, {
                summary: 'Approved ' + withdrawValue + contract.token0 + '-' + contract.token1,
                approval: { tokenAddress: contract.stakingContractAddress, spender: '' }
              })
            })
          }
        >
          {' '}
          Approve
        </ButtonPrimary>
      ) : (
        <ButtonPrimary>Connect Wallet</ButtonPrimary>
      )}

      <div>
        {Number(result.lpApproved) > 0 ? (
          <ButtonPrimary
            onClick={() =>
              depositLP(
                contract.stakingContractAddress,
                contract.tokenAddress,
                contract.user,
                library,
                result.lpApproved
              ).then((response: TransactionResponse) => {
                addTransaction(response, {
                  summary: 'Deposited ' + withdrawValue + contract.token0 + '-' + contract.token1,
                  approval: { tokenAddress: contract.stakingContractAddress, spender: '' }
                })
              })
            }
          >
            {' '}
            Deposit {result.lpApproved} tokens
          </ButtonPrimary>
        ) : (
          <Button>Deposit</Button>
        )}
      </div>
    </Container>
  )
}
