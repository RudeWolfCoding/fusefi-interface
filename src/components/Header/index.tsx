import { ChainId } from '@fuseio/fuse-swap-sdk'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { Route } from 'react-router-dom'
import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { getNativeCurrencySymbol } from '../../utils'
import { BINANCE_MAINNET_CHAINID, BINANCE_TESTNET_CHAINID } from '../../constants'

const HeaderFrame = styled.div`
  padding-right: 2.6%;
  width: 100%;
  top: 0;
  opacity: 0.85;
  z-index: 3;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding-right:0px;
    width: calc(100%);
    margin-bottom: 2rem;
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  padding-left: 42px;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  height: 39px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  border: solid 2px;
  border-color: ${({ theme }) => theme.bg3};
  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled('div')`
  border: 2px solid ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text1};
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`
const BackButton = styled.div`
  padding-right: 2.6%;
  width: 100%;
  top: 0;
  z-index: 3;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function goBack(url: string) {
  window.location.replace(url)
}

export const NETWORK_LABELS: any = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FUSE]: 'Fuse',
  [BINANCE_TESTNET_CHAINID]: 'Binance Testnet',
  [BINANCE_MAINNET_CHAINID]: 'Binance'
}
export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }}>
        <HeaderElement>
          <Route exact path="/farm/:currencyIdA">
            <BackButton
              onClick={() => {
                goBack('https://v2.fuseswap.com/#/farm')
              }}
            >
              &#8592; Back to the list
            </BackButton>{' '}
          </Route>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {getNativeCurrencySymbol(chainId)}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
