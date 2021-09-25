import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import Icon from './icons'
import { Market } from '../../state/lending/hooks'

const TitleIcon = styled('div')`
  flex: 1 1 19%;
  text-align: center;
  margin: auto;
  padding-left: 24px;
  line-height: 10px;
  font-weight: 500;
  font-size: 15px;
`

const Item = styled('div')`
  display: flex;
  flex: 1 1 19%;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  margin: auto;
  line-height: 10px;
  font-weight: 300;
  > p {
    width: 100%;
    > span {
      color: #ffffff99;
    }
  }
`

const Apy = styled('div')`
  display: flex;
  flex: 1 1 11%;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  margin: auto;
  line-height: 10px;
  font-weight: 500;
`

const Container = styled('div')`
  display: block;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover {
    font-weight: 800;
    background: #111219;
    opacity: 0.85;
    text-orientation: upright;
    height: 100%;
  }
`

const Link = styled.a`
  width: 40%;
  z-index: 1;
  content: 'Select';
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  text-align: center;
  position: relative;
  display: inline-block;
  transform-origin: right top 0;
  border-radius: 12px;
  margin: auto;
  text-decoration: none;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  :after {
    content: 'asa';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2px;
    border-radius: 12px;
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  :hover {
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
    color: black;
    -webkit-background-clip: none;
    -webkit-text-fill-color: black;
  }
`

const ApyField = styled.div<{ background?: string }>`
  font-family: 'Inter';
  font-size: 16px;
  padding: 10px;
  text-align: center;
  color: black;
  margin: auto;
  border-radius: 999px;
  background: ${({ background }) => background};
`

interface LendingMarketProps {
  market: Market
}

export default function LendingMarket({ market }: LendingMarketProps) {
  return (
    <Container>
      <Wrapper>
        <TitleIcon>
          <Icon address={market.underlyingAssetAddress} />
        </TitleIcon>

        <Item>
          <p>
            {numeral(market.liquidity).format('$0a')}
            <span> USD</span>
          </p>
        </Item>

        <Item>
          <p>
            {numeral(market.borrowBalance).format('$0a')}
            <span> USD</span>
          </p>
        </Item>
        <Apy>
          <ApyField background="linear-gradient(0deg, #d0f7d7, #d0f7d7)">
            {numeral(market.supplyApy).format('0.0000')}%
          </ApyField>
        </Apy>
        <Apy>
          <ApyField background="linear-gradient(0deg, #fdffb2, #fdffb2)">
            {numeral(market.borrowApy).format('0.0000')}%
          </ApyField>
        </Apy>

        <Item>
          <Link
            target="_blank"
            href="https://app.ola.finance/networks/0x5809FAB2Bf39efae6DD8691B7F90c468c234A1A7/markets"
          >
            Deposit
          </Link>
          <Link
            target="_blank"
            href="https://app.ola.finance/networks/0x5809FAB2Bf39efae6DD8691B7F90c468c234A1A7/markets"
          >
            Borrow
          </Link>
        </Item>
      </Wrapper>
    </Container>
  )
}
