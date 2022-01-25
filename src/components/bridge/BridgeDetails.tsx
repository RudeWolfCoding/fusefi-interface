import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { RowBetween, RowFixed } from '../Row'
import { TYPE } from '../../theme'
import { CurrencyAmount } from '@fuseio/fuse-swap-sdk'
import {  useCalculatedBridgeFee, BridgeDirection } from '../../state/bridge/hooks'
import { useCurrency } from '../../hooks/Tokens'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  width: 100%;
  margin: auto;
  border-radius: 16px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg1};
  margin-top: 1rem;
  z-index: -1;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  transition: transform 300ms ease-in-out;
`

function BridgeDetails({
  inputCurrencyId,
  inputAmount,
  bridgeDirection
}: {
  inputCurrencyId: string | undefined
  inputAmount: CurrencyAmount | undefined
  bridgeDirection: BridgeDirection | undefined
}) {
  const theme = useContext(ThemeContext)
  const currency = useCurrency(inputCurrencyId, 'Bridge')
  const calculatedFee = useCalculatedBridgeFee(inputCurrencyId, inputAmount, bridgeDirection)



  return (
    <AdvancedDetailsFooter show={true}>
      <RowBetween style={{ flexDirection: 'column' }}>
        <RowFixed style={{width: '100%'}}>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.white}>
            Bridge Fee: {calculatedFee ? `${Number(calculatedFee).toFixed(7)}` : '-----' }  {currency ? ` ${currency?.symbol}` : ''}
          </TYPE.black>
        </RowFixed>
      </RowBetween>
    </AdvancedDetailsFooter>
  )
}

export default BridgeDetails
