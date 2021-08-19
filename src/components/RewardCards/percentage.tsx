import React, { useEffect } from 'react'
import styled from 'styled-components'
import { User } from '../../utils/farm/constants'

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
  callBack: any
  user: User
}

export default function Deposit({ user, callBack }: Deposit) {
  function selectPercentage(amount: number) {
    const calculated = (Number(user.lpDeposited) * amount) / 100
    const rewards =
      Number(user.rewardEstimate) +
      (Number(user.rewardEstimate) / Number(user.lpAvailable)) * ((Number(user.lpDeposited) * amount) / 100)
    callBack(calculated.toFixed(2), rewards.toFixed(2).toString())
  }
  useEffect(() => {
    console.log(user)
  }, [user])

  return (
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
  )
}
