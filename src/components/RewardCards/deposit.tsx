import React, { useEffect, useState, useCallback } from 'react'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useActiveWeb3React } from '../../hooks'
import { ButtonError, ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { depositLP } from '../../utils/rewards'
import { Reward, User } from '../../utils/farm/constants'
import { Token, TokenAmount } from '@fuseio/fuse-swap-sdk'
import { useTokenBalance } from '../../state/wallet/hooks'
import { RowBetween } from '../Row'
import { parseUnits } from 'ethers/lib/utils'
import Percentage from './percentage'
import EstimatedRewards from './modal'
import Loader from '../Loaders/default'
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

interface Deposit {
  depositValue?: string
  user: User
  reward: Reward
}

enum MigrationState {
  INITIAL = 0,
  PENDING = 1,
  MIGRATED = 2
}

export default function Deposit(props: Deposit) {
  const addTransaction = useTransactionAdder()
  const { account, library, chainId } = useActiveWeb3React()
  const [depositValue, setdepositValue] = useState('0')
  const [amount, setAmount] = useState('0')
  const [migrationState, setMigrationState] = useState<MigrationState>(MigrationState.INITIAL)

  const pairSymbol = props.reward.token0.symbol + '-' + props.reward.token1.symbol

  const token = new Token(
    chainId ? chainId : 122,
    props.reward.contractAddress ? props.reward.contractAddress : '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
    18
  )

  const tokenLP = new Token(
    chainId ? chainId : 122,
    props.reward.LPToken ? props.reward.LPToken : '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
    18
  )

  const [approval, approveCallback] = useApproveCallback(
    new TokenAmount(tokenLP, '100'),
    props.reward.contractAddress ? props.reward.contractAddress : '0x1bbB72942E4F73753CA83787411DBed4476A5a7e'
  )

  const userPoolBalance = useTokenBalance(account ?? undefined, tokenLP)

  function setPercentage(value: string) {
    setdepositValue(value)
  }

  const deposit = useCallback(() => {
    if (account && depositValue) {
      try {
        setMigrationState(MigrationState.PENDING)
        depositLP(
          props.reward.contractAddress,
          account ? account : '0x1bbB72942E4F73753CA83787411DBed4476A5a7e',
          parseUnits(depositValue ?? '0').toString(),
          'multi',
          library?.provider
        ).then(res => setMigrationState(MigrationState.MIGRATED))
      } catch (e) {
        setMigrationState(MigrationState.INITIAL)
        console.log(e)
      }
    }
  }, [account, depositValue])

  useEffect(() => {
    setdepositValue(userPoolBalance ? userPoolBalance.toSignificant(4) : '0')
    setAmount(userPoolBalance ? userPoolBalance.toSignificant(4) : '0')
  }, [props, addTransaction])

  return approval != ApprovalState.UNKNOWN ? (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        {userPoolBalance && (
          <Balance>
            <span>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'} </span> &nbsp; <span>{pairSymbol}</span>
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
      <Percentage selectPerecentage={setPercentage} value={amount} user={props.user} />
      <EstimatedRewards rate={props.reward.rewardsInfo[0].rewardRate} reward={token} />
      {(approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING) && (
        <RowBetween marginBottom={20}>
          <ButtonPrimary onClick={approveCallback} disabled={approval === ApprovalState.PENDING}>
            {approval === ApprovalState.PENDING ? <span>Approving</span> : 'Approve '}
          </ButtonPrimary>
        </RowBetween>
      )}
      <ButtonError
        onClick={() => (migrationState === MigrationState.MIGRATED ? '' : deposit())}
        disabled={approval !== ApprovalState.APPROVED}
      >
        Deposit
      </ButtonError>
    </Container>
  ) : (
    <Loader />
  )
}
