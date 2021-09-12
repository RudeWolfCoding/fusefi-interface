import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '../FarmList/icons'
import { Flex } from 'rebass'
import { tryFormatDecimalAmount, tryFormatPercentageAmount } from '../../../utils'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover {
    background: #111219;
  }
`
const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

const Column = styled(Flex)`
  text-align: center;
  margin: auto;
  padding-left: 24px;
  line-height: 10px;
  font-size: 1.15rem;
  font-weight: 300;
  flex-wrap: wrap;
`

const Field = styled(Flex)`
  color: grey;
  display: flex;
`

const Button = styled('div')`
  content: 'Select';
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  padding-left: 16px;
  padding-right: 16px;
  transform-origin: right top 0;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
  border-radius: 12px;
  text-align: center;
  margin: auto;
  position: absolute;
  top: 25%;
  right: 15px;
  color: black;
`
function toggle(address: string) {
  window.location.replace(`/#/farm/${address}`)
}

export default function FarmListItem({ farm }: any) {
  const [showButon, setshowButon] = useState(false)

  return (
    <Container onMouseEnter={() => setshowButon(true)} onMouseLeave={() => setshowButon(false)}>
      <Column
        flex={'1 1 25%'}
        margin={'auto'}
        onClick={() => {
          toggle(farm.contractAddress)
        }}
      >
        <Icon pairName={farm.pairName} name={farm.pairName} />
      </Column>
      <Column flex={'1 1 20%'}>
        <Field
          style={{
            minWidth: '60px',
            borderRadius: '999px',
            margin: 'auto',
            padding: '0.5rem',
            background: 'linear-gradient(0deg, #d0f7d7, #d0f7d7)'
          }}
        >
          <span
            style={{
              margin: 'auto',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '21px',
              wordSpacing: '0px',
              color: '#4b4b4b'
            }}
          >
            {tryFormatPercentageAmount(farm.rewardsInfo[0].apyPercent, 2)}%
          </span>
        </Field>
      </Column>
      <Column flex={'1 1 10%'} fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {tryFormatDecimalAmount(farm.reserve0, 18, 2)}
          </Field>
          <Field>{farm.token0.symbol}</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {tryFormatDecimalAmount(farm.reserve1, 18, 2)}
          </Field>
          <Field>{farm.token1.symbol}</Field>
        </Wrapper>
      </Column>
      <Column paddingLeft={'70px'} flex={'1 1 20%'} fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            0
          </Field>
          <Field>USD / day</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            0
          </Field>
          <Field>WFUSE / day</Field>
        </Wrapper>
      </Column>
      <Column flex={'1 1 10%'}>
        {showButon && (
          <Button
            onClick={() => {
              toggle(farm.contractAddress)
            }}
          >
            Select
          </Button>
        )}
      </Column>
    </Container>
  )
}
