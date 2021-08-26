import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { withdrawInterest } from '../../utils/rewards'
import { Reward, User, UserObj } from '../../utils/farm/constants'
import { formatUnits } from 'ethers/lib/utils'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-top: 10px;
  font-size: 1.25rem;
  padding: 1.5rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
`

const Wrapper = styled('div')`
  flex: wrap;
  margin: auto;
  margin-bottom: 15px;
  margin-top: 15px
  overflow: hidden;
  text-align: center;
`

const Pool = styled('div')`
  padding: 0.25rem;
  width: 100%;
  text-align: left;
  font-size: 14px;
  text-align: center;
  > span {
    text-align: right;
    flex: 1;
    
  }
  > h1 {
    width: 100%;
    text-align: left;
  }
`

const Button = styled(ButtonPrimary)`
  border-radius: 12px;
  :hover {
    cursor: pointer;
  }
`

interface ClaimProps {
  withdrawValue?: number
  user: User
  reward: Reward
}

export default function ClaimReward(props: ClaimProps) {
  const addTransaction = useTransactionAdder()
  const { account, library } = useActiveWeb3React()
  const [result, setResult] = useState<User>(UserObj)

  async function onClaim() {
    if (!library || !account) return
    const response = withdrawInterest(props.reward.contractAddress, account, props.reward.type, library?.provider)

    try {
      addTransaction(await response, { summary: `Rewards Claimed` })
      setResult({
        account: '',
        lpApproved: '0',
        lpDeposited: '0',
        lpAvailable: '0',
        rewardAcruded: result.rewardAcruded,
        rewardUnlockedUser: '0',
        rewardEstimate: result.rewardEstimate,
        rewardTotal: result.rewardTotal,
        rewardUnlocked: result.rewardUnlocked
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setResult(props.user)
  }, [props, addTransaction])

  return (
    <Container>
      <Wrapper>
        <h2>Accruded Rewards</h2>
        <Pool>
          <h3>{Number(formatUnits(props.reward.rewardsInfo[0].accuruedRewards, 18)).toFixed(2) || 0}</h3>
        </Pool>
      </Wrapper>

      <Button onClick={() => onClaim()}> Claim WFUSE Rewards</Button>
    </Container>
  )
}
