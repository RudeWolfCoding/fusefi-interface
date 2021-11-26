import { ChainId } from '@fuseio/fuse-swap-sdk'
import React, { useCallback, useState } from 'react'
import Lottie from 'react-lottie-player'
import { TYPE } from '../../theme'
import AddressInputPanel from '../AddressInputPanel'
import Modal from '../Modal'
import fusefiAnimation from '../../assets/animation/fusefi-logo.json'
import { ButtonError } from '../Button'
import { useClaimModalOpen, useToggleClaimModal } from '../../state/application/hooks'
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from '../../state/claim/hooks'
import { AutoColumn } from '../Column'
import { RowCenter } from '../Row'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0 1rem;
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
    <Modal isOpen={claimModalOpen} onDismiss={toggleClaimModal} minHeight={52}>
      <AutoColumn gap="md">
        <RowCenter>
          <Lottie animationData={fusefiAnimation} speed={0.75} style={{ width: '150px' }} play />
        </RowCenter>
        <RowCenter>
          <TYPE.largeHeader fontSize={30}>{userUnclaimedAmount?.toSignificant()} VOLT</TYPE.largeHeader>
        </RowCenter>
        <RowCenter>
          <TYPE.subHeader padding="0 1rem" textAlign="center">
            Enter an address to trigger a VOLT claim. If the address has any claimable VOLT it will be sent to them on
            submission.
          </TYPE.subHeader>
        </RowCenter>
        <Wrapper>
          <AddressInputPanel value={claimAccount} onChange={setClaimAccount} chainId={ChainId.FUSE} />
          {claimAccount && !userUnclaimedAmount?.greaterThan('0') && !userHasAvailableClaim && (
            <TYPE.main fontSize={14} fontWeight={400} color="#FF6871" marginTop="1rem">
              User has no claim available
            </TYPE.main>
          )}
          <ButtonError
            disabled={!userHasAvailableClaim && !claimAccount}
            error={!userHasAvailableClaim && !claimAccount}
            onClick={() => onClaim()}
            style={{ marginTop: '1rem' }}
          >
            Claim VOLT
          </ButtonError>
        </Wrapper>
      </AutoColumn>
    </Modal>
  )
}
