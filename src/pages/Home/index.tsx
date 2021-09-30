import AppBody from '../AppBody'
import React from 'react'
import Prices from '../../components/HomeCards/prices'
import Analytics from '../../components/HomeCards/analytics'
import Reward from '../../components/HomeCards/rewards'
import styled from 'styled-components'
import News from '../../components/News'
import FuseCashBanner from '../../components/FuseCashBanner'

const Wrap = styled('div')`
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 45px;
  display: flex;
  flex-wrap: wrap;
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
`
const Item = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
  margin: 24px 12px;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
`

const Tweet = styled('div')`
  z-index: 100;
  margin: 24px 12px;
  text-align: center;
  display: block;
  overflow: hidden;
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
        <FuseCashBanner />
      </Wrap>
    </AppBody>
  )
}
