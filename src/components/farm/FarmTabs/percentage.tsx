import React from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex: wrap;
  margin: auto;
  width: 80%;
  overflow: hidden;
  margin-bottom: 24px;
`

const Selector = styled('button')`
  margin: 2px;
  padding: 7px 15px;
  display: inline-block;
  text-align: center;
  justify-content: flex-end;
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  border-radius: 999px;
  border: solid 2px white;
  background: none;
  cursor: pointer;
`
interface Percentage {
  selectPerecentage: any
  value?: string
}

export default function Percentage({ value, selectPerecentage }: Percentage) {
  function selectPercentage(amount: number) {
    const calculated = (Number(value) * amount) / 100
    selectPerecentage(String(calculated))
  }

  return (
    <Wrapper>
      <Selector
        onClick={() => {
          selectPercentage(25)
        }}
      >
        {' '}
        25%{' '}
      </Selector>
      <Selector
        onClick={() => {
          selectPercentage(50)
        }}
      >
        {' '}
        50%{' '}
      </Selector>
      <Selector
        onClick={() => {
          selectPercentage(75)
        }}
      >
        {' '}
        75%{' '}
      </Selector>
      <Selector
        onClick={() => {
          selectPercentage(100)
        }}
      >
        {' '}
        <span>100%</span>{' '}
      </Selector>
    </Wrapper>
  )
}
