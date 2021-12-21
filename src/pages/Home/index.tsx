import AppBody from '../AppBody'
import React from 'react'
import Prices from '../../components/HomeCards/prices'
import Analytics from '../../components/HomeCards/analytics'
import Reward from '../../components/HomeCards/rewards'
import styled from 'styled-components'
import News from '../../components/News'
import FuseCashBanner from '../../components/FuseCashBanner'

const Wrap = styled('div')`
  margin-top: 3.25%;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding-left: 1rem;
    padding-right: 1rem;
  `}
`

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  margin: auto;
  z-index: 3;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `}
`
const Item = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
  margin: 9px 4.5px;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
`

const Tweet = styled('div')`
  z-index: 100;
  margin: 9px 4.5px;
  text-align: center;
  display: block;
  width: 100%;
  flex-wrap: wrap;
  flex: 1 0 0;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
`

export default function HomePage() {
  return (
    <AppBody>
      <Wrap>
        <Prices />
        <Container>
          <Tweet>
            <News />
          </Tweet>
          <Item>
            <Analytics />
            <Reward />
          </Item>
        </Container>
      </Wrap>
      <FuseCashBanner />
    </AppBody>
  )
}
