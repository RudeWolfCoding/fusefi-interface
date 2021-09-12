import React from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../../hooks'
import { ButtonPrimary } from '../../Button'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { getProgram } from '../../../utils/farm'
import { tryFormatAmount } from '../../../utils'

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
  width: 100%;
  text-align: left;
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

export default function ClaimReward({ farm }: any) {
  const addTransaction = useTransactionAdder()
  const { account, library } = useActiveWeb3React()

  const parsedAccuruedRewards = tryFormatAmount(farm.rewardsInfo[0].accuruedRewards, 18)

  async function onClaim() {
    if (!library || !account) return
    try {
      const rewardProgram = getProgram(farm?.contractAddress, library?.provider, farm?.type)
      const response = await rewardProgram.withdrawReward(account)
      const formattedReponse = { ...response, hash: response.transactionHash }

      addTransaction(formattedReponse, { summary: `Rewards Claimed` })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <Wrapper>
        <h3>Accruded Rewards</h3>
        <Pool>
          <h3>{parsedAccuruedRewards}</h3>
        </Pool>
      </Wrapper>

      <Button onClick={() => onClaim()}> Claim WFUSE Rewards</Button>
    </Container>
  )
}
