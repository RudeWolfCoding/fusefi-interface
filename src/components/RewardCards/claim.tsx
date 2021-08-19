import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { withdrawInterest } from '../../utils/rewards'
import { Reward } from '../../utils/farm/constants'

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
  display: flex;
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
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  > span {
    text-align: right;
    flex: 1;
  }
  > b {
    text-align: left;
  }
`
const Claim = styled('div')`
  margin-top: 24px;
  margin-bottom: 24px;
  width: 100%;
  font-size: 14px;
`

const Button = styled(ButtonPrimary)`
  border-radius: 12px;
  :hover {
    cursor: pointer;
  }
`

interface ClaimProps {
  withdrawValue?: number
  data: {
    lpDeposited: string
    rewardUnlocked: string
    rewardAcruded: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
  }
  contract: Reward
}

export default function ClaimReward(props: ClaimProps) {
  const addTransaction = useTransactionAdder()
  const { account, library } = useActiveWeb3React()
  const [result, setResult] = useState<{
    rewardAcruded: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
    rewardUnlocked: string
  }>({ rewardAcruded: '0', rewardUnlockedUser: '0', rewardEstimate: '0', rewardTotal: '0', rewardUnlocked: '0' })

  async function onClaim() {
    if (!library || !account) return
    const response = withdrawInterest(props.contract.contractAddress, account, props.contract.type, library?.provider)

    try {
      addTransaction(await response, { summary: `Rewards Claimed` })
      setResult({
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
    setResult(props.data)
    console.log(props.contract)
  }, [props, addTransaction])

  return (
    <Container>
      <Wrapper>
        <Pool>
          <b>Total Rewards</b> <span>{Number(result.rewardTotal) || 0}</span>
        </Pool>
        <Pool>
          <b>Remaining Rewards</b> <span>{Number(result.rewardTotal) - Number(result.rewardUnlocked) || 0}</span>
        </Pool>
        <Pool>
          <b>Your Estimated Rewards</b> <span>{Number(result.rewardEstimate).toFixed(0) || 0}</span>
        </Pool>
      </Wrapper>

      <Wrapper>
        <Claim>
          <b>Claimed</b> {result.rewardAcruded || 0}
        </Claim>
        <Claim>
          <b>Claimable</b> {result.rewardUnlockedUser || 0}
        </Claim>
        <Claim style={{ textAlign: 'center' }}>
          <b>Collected</b> {(Number(result.rewardAcruded) || 0 + Number(result.rewardUnlockedUser)).toFixed(2) || 0}
        </Claim>
      </Wrapper>
      <Button onClick={() => onClaim()}> Claim WFUSE Rewards</Button>
    </Container>
  )
}
