import React, { useState } from 'react'
import Modal from '../Modal'
import { useClaimModalOpen, useToggleClaimModal } from '../../state/application/hooks'
import styled from 'styled-components'

const Container = styled.div`
  flex-wrap: wrap;
  display: flex;
`

const Wrapper = styled.div`
  width: 50%;
`

export default function ClaimVoltModal() {
  const claimModalOpen = useClaimModalOpen()
  const toggleClaimModal = useToggleClaimModal()
  const [stage, setStage] = useState(0)

  return (
    <Modal isOpen={claimModalOpen} onDismiss={toggleClaimModal} backgroundColor={'black'}>
      {stage === 0 && (
        <Container>
          <Wrapper>
            <h1>Volt Token (VOLT)</h1>
            <p>
              The Volt Token is our governance token. It is used predominantly to vote on FuseFi proposals including new
              products and services, The Volt Token is also expected to have other utility within the platform such as
              providing access to premium services and lowering fees on lending and swapping protocols
            </p>
          </Wrapper>
          <Wrapper>
            <h1>Why launch a token?</h1>
            <p>
              FuseFi already incorporates innovative services with tens of thousands of users and millions of dollars in
              total value locked (TVL). In order to scale FuseFi for the masses, a token is need to provide governance
              and and to allow for a growth model to develop that incentivises contributors, technology partners and
              users.{' '}
            </p>
            <h1>Why launch it now?</h1>
            <p>
              DeFi has developed rapidly in the past few years making financial products and service development open
              and accessible and benefiting millions of tech savvy individuals. We believe that the time has come to
              take the power and capabilities of DeFi to the masses with a mobile-led approach that removes complexity
              and provides a truly human friendly experience.{' '}
            </p>
          </Wrapper>
          <button type="button" className="btn btn-primary" onClick={() => setStage(stage + 1)}>
            Next
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setStage(stage + 1)}>
            Next
          </button>
        </Container>
      )}

      {stage === 1 && (
        <Container>
          <Wrapper>
            <h1>How is VOLT distributed?</h1>
            <p>
              The initial supply of Volt Tokens is 5 billion, minted at the initial token generation event (TGE) and
              allocated towards participants in the initial fundraise (with a 49-week vesting period), an exclusive
              Dutch auction dedicated to Fuse Token holders, and the FuseFi treasury for partnerships,community
              incentives, developments and future airdrops.
            </p>
            <p>
              5 billion VOLT tokens are also expected to be minted over the space of 4 yearsin order to incentivize
              liquidity on the platform as as well as to reward DAO members that stake their tokens and participate in
              governance
            </p>
          </Wrapper>
          <Wrapper>
            <h1>Why launch a token?</h1>
            <p>
              FuseFi already incorporates innovative services with tens of thousands of users and millions of dollars in
              total value locked (TVL). In order to scale FuseFi for the masses, a token is need to provide governance
              and and to allow for a growth model to develop that incentivises contributors, technology partners and
              users.{' '}
            </p>
            <h1>Why launch it now?</h1>
            <p>
              DeFi has developed rapidly in the past few years making financial products and service development open
              and accessible and benefiting millions of tech savvy individuals. We believe that the time has come to
              take the power and capabilities of DeFi to the masses with a mobile-led approach that removes complexity
              and provides a truly human friendly experience.{' '}
            </p>
          </Wrapper>
        </Container>
      )}
    </Modal>
  )
}
