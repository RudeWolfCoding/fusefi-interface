import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { RowBetween, RowFixed } from '../Row'
import { TYPE } from '../../theme'
import { CurrencyAmount } from '@fuseio/fuse-swap-sdk'
import { useCalculatedBridgeFee, BridgeDirection, useBridgeFee } from '../../state/bridge/hooks'
import { useCurrency } from '../../hooks/Tokens'
import BridgeInfo from './BridgeInfo'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  width: 100%;
  margin: auto;
  border-radius: 16px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg1};
  margin-top: 20px;
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
  const fee = useBridgeFee(inputCurrencyId, bridgeDirection)

  const feePercentage = fee ? Number(fee) * 100 : 0

  return (
    <>
      <AdvancedDetailsFooter show={true}>
        <RowBetween style={{ flexDirection: 'column' }}>
          <RowFixed style={{ width: '100%' }}>
            <TYPE.black fontFamily={'Inter'} fontSize={12} fontWeight={400} color={theme.white}>
              Bridge Fee: {calculatedFee ? `${Number(calculatedFee).toFixed(7)}` : '-----'}{' '}
              {currency ? ` ${currency?.symbol + ' Fee ' + `(${feePercentage}%)`}` : ''}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
      </AdvancedDetailsFooter>
      <BridgeInfo />
    </>
  )
}

export default BridgeDetails
