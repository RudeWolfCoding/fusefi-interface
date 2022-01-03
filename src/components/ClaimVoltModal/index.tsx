import React, { useCallback, useState } from 'react'
import { TYPE } from '../../theme'
import Modal from '../Modal'
import { ButtonError } from '../Button'
import { useClaimModalOpen, useToggleClaimModal } from '../../state/application/hooks'
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from '../../state/claim/hooks'
import { AutoColumn } from '../Column'
import Row, { RowCenter } from '../Row'
import styled from 'styled-components'
import VoltIcon from '../../assets/svg/volt.svg'

const Wrapper = styled.div`
  padding: 1rem 0.25rem;
  :after {
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
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
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFF;
  padding-left: 20px;
  padding-right: 53px;
`

const Input = styled.input`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFF;
  background: black;
  border: 0.5px solid #B5B9D3;
  box-sizing: border-box;
  border-radius: 5px;
  height: 32px;
  width: 90%;
  margin-left: 20px;
  padding-right: 53px;
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
      <Wrapper>
        <AutoColumn gap="sm">
          <Row padding="0rem 1rem">
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
          <Wrapper>
              <Input />
            {claimAccount && !userUnclaimedAmount?.greaterThan('0') && !userHasAvailableClaim && (
              <TYPE.main fontSize={14} fontWeight={400} color="#FF6871" marginTop="1rem">
                User has no claim available
              </TYPE.main>
            )}
            <p>     Provide wallet address or Connect to proceed with claim</p>
            <ButtonError
              disabled={!userHasAvailableClaim && !claimAccount}
              error={!userHasAvailableClaim && !claimAccount}
              onClick={() => onClaim()}
              style={{ marginTop: '1rem' }}
            >
              Start the claiming process
            </ButtonError>
          </Wrapper>
        </AutoColumn>
      </Wrapper>
    </Modal>
  )
}
