import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../../assets/svg/arrowLarge.svg'
import ArrowSkewed from '../../assets/svg/arrowSkewed.svg'
import FlashIcon from '../../assets/svg/flash.svg'

const Wrap = styled.a`
  height: 50%;
  width: 100%;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
`

const Container = styled.div`
  padding: 16px;
  background: #242637;
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  :after {
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
    content: '';
    position: absolute;
    border-radius: 20px;
    width: 99.75%;
    top: 0;
    bottom: 0;
    left: -1.15px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`
const Title = styled.div`
  font-family: Anton;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(272.32deg, #F3FC1F 35.52%, #3AD889 118.98%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 10%;
`

const ArrowSkew = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
`

export default function HomeRewards() {
  return (
    <Wrap href="https://rewards.fuse.io/" target="_blank">
      <Container>
        <Flash>
          {' '}
          <img src={FlashIcon}></img>{' '}
        </Flash>
        <ArrowSkew>
          {' '}
          <img src={ArrowSkewed}></img>{' '}
        </ArrowSkew>
        <Title>Frictionless DEFI is coming</Title>
        <Title>Join the waitlist  <Arrow /></Title>
      </Container>
    </Wrap>
  )
}
