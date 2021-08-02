import React, { useEffect, useState } from 'react'
import { approveLP, depositLP } from '../../utils/rewards'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import EstimatedRewards from './modal'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import Percentage from './percentage'

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
  const addTransaction = useTransactionAdder()
  const { library, account } = useActiveWeb3React()
  const [depositValue, setdepositValue] = useState(props.depositValue)
  const [estimate, setEstimate] = useState('0')

  function setPercentage(value: string, estimate: string) {
    setEstimate(estimate)
    setdepositValue(value)
  }

  useEffect(() => {
    setEstimate(props.data.rewardEstimate)
    setdepositValue('0')
  }, [props, addTransaction, estimate])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        <Balance>
          <span>{props.data.lpAvailable} </span> &nbsp;{' '}
          <span>{props.contract.token0 + '-' + props.contract.token1}</span>
        </Balance>
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
        <span>{props.contract.token0 + '-' + props.contract.token1}</span>
      </InputWrapper>
      <Percentage callBack={setPercentage} user={props.data} />
      <EstimatedRewards estimate={estimate} />
      {account ? (
        <ButtonPrimary
          onClick={() =>
            approveLP(
              props.contract.stakingContractAddress,
              props.contract.tokenAddress,
              props.contract.user,
              library,
              depositValue
            ).then((response: TransactionResponse) => {
              addTransaction(response, {
                summary: 'Approved ' + depositValue + props.contract.token0 + '-' + props.contract.token1,
                approval: { tokenAddress: props.contract.stakingContractAddress, spender: '' }
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
        {Number(props.data.lpApproved) > 0 ? (
          <ButtonPrimary
            onClick={() =>
              depositLP(
                props.contract.stakingContractAddress,
                props.contract.tokenAddress,
                props.contract.user,
                library,
                props.data.lpApproved
              ).then((response: TransactionResponse) => {
                addTransaction(response, {
                  summary: 'Deposited ' + depositValue + props.contract.token0 + '-' + props.contract.token1,
                  approval: { tokenAddress: props.contract.stakingContractAddress, spender: '' }
                })
              })
            }
          >
            {' '}
            Deposit {props.data.lpApproved} tokens
          </ButtonPrimary>
        ) : (
          <Button>Deposit</Button>
        )}
      </div>
    </Container>
  )
}
