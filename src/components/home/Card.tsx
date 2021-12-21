import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-basis: 25%;
  flex-direction: column;
  align-items: flex-start;
  background: #202231;
  color: white;
  padding: 10px 16px;
  margin: 0 2.5px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 0 0 1rem 0;
  `}
`

const ValueWrapper = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
`

const Value = styled(animated.h2)`
  display: inline-block;
  font-size: 24px;
  color: white;
  margin: 0;
`

const ValueSuffix = styled.h2`
  display: inline-block;
  font-size: 24px;
  margin: 0;
  white-space: pre;
  color: #b5b9d3;
`

const Title = styled.p`
  font-size: 16px;
  margin: 0;
  color: #b5b9d3;
`

type CardProps = {
  title: string
  value: string
  valueSuffix?: string
  valueDecimals?: number
}

export default function Card({ title, value, valueSuffix }: CardProps) {
  return (
    <Wrapper>
      <ValueWrapper>
        <ValueSuffix>{valueSuffix}</ValueSuffix>
        <Value>{value}</Value>
      </ValueWrapper>
      <Title>{title}</Title>
    </Wrapper>
  )
}
