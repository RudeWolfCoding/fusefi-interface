import { ChainId } from '@fuseio/fuse-swap-sdk'
import React, { useCallback, useState } from 'react'
import { TYPE } from '../../theme'
import Modal from '../Modal'
import { ButtonGradient } from '../Button'
import { useClaimModalOpen, useToggleClaimModal } from '../../state/application/hooks'
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from '../../state/claim/hooks'
import { AutoColumn } from '../Column'
import Row, { RowCenter } from '../Row'
import styled from 'styled-components'
import VoltIcon from '../../assets/svg/volt.svg'
import AddressInputPanel from '../AddressInputVolt'

const Wrapper = styled.div<{ error: boolean }>`
  padding: 20px;
  :after {
    background: ${({ error }) =>
      error
        ? 'linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%)'
        : 'linear-gradient(to bottom right, red, yellow)'};
    content: '';
    position: absolute;
    border-radius: 20px;
    width: 99%;
    top: 0;
    bottom: 1px;
    left: -0.15px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

const InfoText = styled.div`
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #FFFFF;
  padding-left: 10px;
  padding-right: 53px;
  margin-bottom: 20px;
`
const Dot = styled.div<{ error: boolean }>`
  height: 10px;
  width: 10px;
  margin-left: 10px;
  padding-left: 10px;
  background-color: ${({ error }) => (error ? 'red' : 'green')};
  border-radius: 50%;
  display: inline-block;
`

export default function ClaimVoltModal() {
  const [claimAccount, setClaimAccount] = useState('')
  const claimModalOpen = useClaimModalOpen()
  const toggleClaimModal = useToggleClaimModal()

  const userUnclaimedAmount = useUserUnclaimedAmount(claimAccount)
  const userHasAvailableClaim = useUserHasAvailableClaim(claimAccount)
  const claimCallback = useClaimCallback(claimAccount)

  const onClaim = useCallback(async () => {
    try {
      await claimCallback()
      toggleClaimModal()
      setClaimAccount('')
    } catch (error) {
      console.error('Failed to claim tokens', error)
    }
  }, [claimCallback, toggleClaimModal])

  return (
    <Modal isOpen={claimModalOpen} onDismiss={toggleClaimModal} backgroundColor={'black'}>
      <Wrapper error={claimAccount.length < 7 || userHasAvailableClaim}>
        <AutoColumn gap="sm">
          <Row>
            <img src={VoltIcon} alt="" />
            {userHasAvailableClaim ? (
              <TYPE.largeHeader fontSize={30}>{userUnclaimedAmount?.toSignificant()} VOLT</TYPE.largeHeader>
            ) : (
              <TYPE.largeHeader fontSize={30}>VOLT</TYPE.largeHeader>
            )}
          </Row>
          <RowCenter>
            <InfoText>
              Thanks for being an a user of Fusefi. You are receiving this token for using our service and being a early
              supporter!
            </InfoText>
          </RowCenter>
          <AddressInputPanel value={claimAccount} onChange={setClaimAccount} chainId={ChainId.FUSE} />
          {claimAccount.length < 7 ? (
            <TYPE.main
              fontSize={14}
              fontWeight={400}
              color="grey"
              textAlign="center"
              margin="0.5rem"
              marginBottom="50px"
            >
              Please, provide valid wallet address to the input above
            </TYPE.main>
          ) : (
            [
              !userUnclaimedAmount?.greaterThan('0') && !userHasAvailableClaim ? (
                <TYPE.main fontSize={14} fontWeight={400} color="#FF0000" marginTop="1rem" marginBottom="50px">
                  <Dot error={true} /> You are not eligible for the airdrop!
                </TYPE.main>
              ) : (
                <TYPE.main fontSize={14} fontWeight={400} color="#1AFB2A" marginTop="1rem" marginBottom="50px">
                  <Dot error={false} />
                  You were eligible for the airdprop{' '}
                </TYPE.main>
              )
            ]
          )}
          <Row padding={'10px'}>
            <ButtonGradient
              disabled={!userHasAvailableClaim}
              error={!userHasAvailableClaim && !claimAccount}
              onClick={() => onClaim()}
            >
              Start the claiming process
            </ButtonGradient>
          </Row>
        </AutoColumn>
      </Wrapper>
    </Modal>
  )
}
