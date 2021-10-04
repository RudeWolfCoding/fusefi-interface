import React, { useMemo } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import LendingMarket from './LendingMarket'
import href from '../../assets/svg/href.svg'
import { Market, useLendingMarkets } from '../../state/lending/hooks'
import Loader from '../Loaders/table'

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  font-size: 16px;
`
const Container = styled('div')`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  background: #232638;
  border-radius: 16px;
`

const Selector = styled('div')`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 24px;
`

const Field = styled('div')`
  flex: 1 1 19%;
  line-height: 3rem;
  border-bottom: 1px solid black;
  padding-left: 25px;
  text-align: left;
`
const DateField = styled('div')`
  flex: 1 1 19%;
  line-height: 3rem;
  border-bottom: 1px solid black;
`

const SupplyField = styled('div')`
  flex: 1 1 11%;
  line-height: 3rem;
  border-bottom: 1px solid black;
`

const Supply = styled('div')`
  border-radius: 12px;
  background: #0e4f3f;
  padding: 15px;
  margin-right: 10px;
  > p {
    margin-bottom: 8px;
  }
  > span {
    color: #1c9e7e;
    font-size: 14px;
  }
  :hover {
    filter: brightness(120%);
  }
`

const Borrowed = styled('div')`
  border-radius: 12px;
  background: #473660;
  padding: 15px;
  margin-right: 10px;
  > p {
    margin-bottom: 8px;
  }
  > span {
    color: #8e6cc0;
    font-size: 14px;
  }
  :hover {
    filter: brightness(120%);
  }
`
const Ola = styled('a')`
  display: flex;
  border-radius: 12px;
  text-decoration: none;
  background: #242637;
  padding: 15px;
  margin-right: 10px;
  > span {
    padding-left: 20px;
    color: #9fa3c9;
    margin: auto;
    padding-right: 7px;
  }
  > img {
    margin: auto;
  }
  :hover {
    filter: brightness(120%);
    cursor: pointer;
  }
`

export default function Lending() {
  const lendingMarkets = useLendingMarkets()

  const [supplyBalance, borrowBalance] = useMemo(
    () =>
      lendingMarkets.reduce(
        (memo: any, market: any) => [memo[0] + market.supplyBalance, memo[1] + market.borrowBalance],
        [0, 0]
      ),
    [lendingMarkets]
  )

  return (
    <div>
      <Selector>
        <Supply>
          <p>{numeral(supplyBalance).format('$0,0')} USD</p>
          <span>Network Supply Balance</span>
        </Supply>
        <Borrowed>
          <p>{numeral(borrowBalance).format('$0,0')} USD</p>
          <span>Network Borrow Balance</span>
        </Borrowed>
        <Ola href="https://app.ola.finance/networks/0x5809FAB2Bf39efae6DD8691B7F90c468c234A1A7/network" target="_blank">
          <img
            src="https://app.ola.finance/assets/images/ola/ola_symbol_clear.png"
            width="75px;"
            alt="Ola.finance logo"
          />
          <span>Get more stats on Ola Finance </span> <img src={href} alt="Go to Ola.finance" />
        </Ola>
      </Selector>
      <Container>
        <Wrapper>
          <Field>Asset</Field>
          <DateField>Market Size</DateField>

          <DateField>Total Borrowed</DateField>
          <SupplyField>Deposit APY</SupplyField>
          <SupplyField>Borrow APR</SupplyField>

          <DateField>
            <p></p>
          </DateField>
        </Wrapper>

        {lendingMarkets.length ? (
          lendingMarkets.map((lendingMarket: Market) => (
            <div key={lendingMarket.underlyingAssetAddress}>
              <LendingMarket market={lendingMarket} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  )
}
