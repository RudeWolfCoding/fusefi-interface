import React from 'react'
import styled from 'styled-components'
import image from '../../assets/images/rewards.png'
import floater from '../../assets/svg/floater2.svg'

const Wrap = styled.a`
  height: 50%;
  width: 100%;
`

const Container = styled.a`
  padding: 16px;
  background-image: linear-gradient(112deg, #b1ffbf 7%, #fff16d);
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
  :hover {
    background: linear-gradient(110deg, #9bffad 14%, #c2b658);
  }
`
const Title = styled.div`
  color: #052235;
  font-size: 29px;
  font-weight: 600;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`

export default function HomeRewards() {
  return (
    <Wrap>
      <Container href="https://rewards.fuse.io/" target="_blank">
        <Header>
          <img src={image} alt="reward icon" width="116px" />
          <img src={floater} alt="close button" width="40px" />
        </Header>
        <Title>Check out Fuse rewards on Mainnet and BSC</Title>
      </Container>
    </Wrap>
  )
}
