import React, { useEffect, useState } from 'react'
import { approveLP } from '../../utils/rewards'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import { depositLP } from '../../utils/rewards'
import { Reward, User } from '../../utils/farm/constants'
import Percentage from './percentage'
import EstimatedRewards from './modal'
import styled from 'styled-components'

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
  data: User
  contract: Reward
}

export default function Deposit(props: Deposit) {
  const addTransaction = useTransactionAdder()
  const { library, account } = useActiveWeb3React()
  const [depositValue, setdepositValue] = useState('0')
  const [estimate, setEstimate] = useState('0')

  function setPercentage(value: string, estimate: string) {
    setEstimate(estimate)
    setdepositValue(value)
  }

  useEffect(() => {
    setEstimate(props.data.rewardEstimate)
    setdepositValue('0')
  }, [props, addTransaction])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        <Balance>
          <span>{props.data.lpAvailable} &nbsp;</span>
          <span>{props.contract.token0.symbol + '-' + props.contract.token1.symbol}</span>
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
        <span>{props.contract.token0.symbol + '-' + props.contract.token1.symbol}</span>
      </InputWrapper>
      <Percentage callBack={setPercentage} user={props.data} />
      <EstimatedRewards estimate={estimate} />
      {account ? (
        <ButtonPrimary
          onClick={() =>
            approveLP(
              props.contract.contractAddress,
              props.contract.LPToken,
              account ? account : '',
              library,
              depositValue
            ).then((response: TransactionResponse) => {
              addTransaction(response, {
                summary: 'Approved ' + depositValue + props.contract.token0.symbol + '-' + props.contract.token1,
                approval: { tokenAddress: props.contract.contractAddress, spender: '' }
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
              depositLP(props.contract.contractAddress, library, '0', account ? account : '', depositValue).then(
                (response: TransactionResponse) => {
                  addTransaction(response, {
                    summary: 'Deposited ' + depositValue + props.contract.token0 + '-' + props.contract.token1,
                    approval: { tokenAddress: props.contract.contractAddress, spender: '' }
                  })
                }
              )
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
