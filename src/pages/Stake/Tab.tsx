import { TokenAmount, JSBI } from '@fuseio/fuse-swap-sdk'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { ButtonLight, ButtonGradient } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import Input from '../../components/NumericalInput'
import { VOLT, xVOLT } from '../../constants'
import { useXVoltTotalSupply } from '../../hooks/stake'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import useVoltBar from '../../hooks/useVoltBar'
import { useWalletModalToggle } from '../../state/application/hooks'
import { tryParseAmount } from '../../state/swap/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { TYPE } from '../../theme'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  background: #0B0C13;
  border-radius: 11px;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 1rem;
  height: 48px;
  margin-bottom: 0.5rem;
`

const MaxButton = styled.button`
  position: relative;
  margin: 5px 0;
  background: transparent;
  border-radius: 5px;
  border: 0;
  color: white;
  padding: 4px 18px;
  cursor: pointer;
  font-size: 14px;

  :after {
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
    content: '';
    position: absolute;
    border-radius: 5px;
    width: 100%;
    top: 0;
    bottom: 0;
    left: -1px;
    padding: 1px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

export default function Tab({
  isStake,
  account,
  balance
}: {
  isStake: boolean
  account?: string
  balance?: TokenAmount
}) {
  const [value, setValue] = useState('')

  const parsedAmount = tryParseAmount(value, balance?.token)

  const isValid = parsedAmount?.greaterThan('0')

  const xVoltContractVoltBalance = useTokenBalance(xVOLT.address, VOLT)
  const xVoltTotalSupply = useXVoltTotalSupply()

  const xVoltRatio =
    !!xVoltContractVoltBalance && !!xVoltTotalSupply && xVoltTotalSupply?.greaterThan('0')
      ? JSBI.divide(JSBI.BigInt(xVoltContractVoltBalance.raw), JSBI.BigInt(xVoltTotalSupply.raw))
      : undefined

  const { enter, leave } = useVoltBar()

  const toggleWalletModal = useWalletModalToggle()

  const [approval, approveCallback] = useApproveCallback(parsedAmount, xVOLT.address)

  const onMax = useCallback(() => {
    if (balance) {
      setValue(balance.toSignificant())
    }
  }, [balance])

  const action = isStake ? 'Stake' : 'Unstake'

  const onAction = useCallback(async () => {
    try {
      const method = isStake ? enter : leave
      await method(parsedAmount)
      setValue('')
    } catch (e) {
      console.error(e)
    }
  }, [enter, isStake, leave, parsedAmount])

  return (
    <div>
      <Row>
        <TYPE.body fontSize={16}>
          {action} {isStake ? 'VOLT' : 'xVOLT'}
        </TYPE.body>
        <TYPE.body fontSize={14}>available balance: {balance?.toSignificant()}</TYPE.body>
      </Row>
      <InputRow>
        <Input value={value} onUserInput={setValue} placeholder="0" />
        <MaxButton onClick={() => onMax()}>Max</MaxButton>
      </InputRow>
      <TYPE.body fontSize={12} marginBottom="2rem" textAlign="right">
        1xVOLT = {xVoltRatio} VOLT
      </TYPE.body>
      {!account ? (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
      ) : (
        <AutoColumn gap={'md'}>
          {isValid && approval !== ApprovalState.APPROVED && (
            <ButtonGradient onClick={approveCallback} disabled={approval === ApprovalState.PENDING}>
              Approve VOLT
            </ButtonGradient>
          )}
          <ButtonGradient onClick={() => onAction()} disabled={!isValid || approval !== ApprovalState.APPROVED}>
            {action}
          </ButtonGradient>
        </AutoColumn>
      )}
    </div>
  )
}
