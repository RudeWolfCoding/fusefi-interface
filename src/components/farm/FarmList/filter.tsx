import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { BINANCE_CHAIN_ID, ETHEREUM_CHAIN_ID, FUSE_CHAIN_ID } from '../../../connectors'
import fuseLogo from '../../../assets/svg/logos/fuse-small-logo.svg'
import ethereumLogo from '../../../assets/svg/logos/ethereum-small-logo.svg'
import binanceLogo from '../../../assets/svg/logos/binance-small-logo.svg'
import { useHistory } from 'react-router-dom'

const Container = styled('div')`
  border: solid 2px #000000;
  border-radius: 5px;
`
const activeClassName = 'active'

const Button = styled('div').attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  width: 8rem;
  position: relative;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  &.${activeClassName} {
    font-weight: bold;
    border: none;
    text-align: center;
    color: ${({ theme }) => theme.text1};
    :before {
      background: linear-gradient(90deg, #3ad889, #f3fc1f);
      content: '';
      position: absolute;
      border-radius: 5px;
      width: 100%;
      top: 0;
      bottom: 0;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  &:nth-child(2) {
    margin: 0 7px;
  }

  &:nth-child(3) {
    small {
      margin-left: 30px;
    }
  }
`
const LogoIcon = styled.img`
  padding: 0 5px;
  position: absolute;
  left: 5px;
`

const LogoText = styled.small`
  font-size: 14px;
`
const ButtonWrapper = styled.div`
  display: flex;
  margin: 5px 0;
`

const SubTitle = styled.small`
  font-weight: lighter;
`
const Wrapper = styled.div`
  margin-top: 20px;
`

export default function Filter({ networkId }: { networkId: number }) {
  const history = useHistory()

  const selectNetwork = (network: number) => {
    history.push(`/farm/${network}`)
  }

  return (
    <Container>
      <Wrapper>
        <SubTitle>Showing pool on</SubTitle>
        <ButtonWrapper>
          <Button className={networkId === FUSE_CHAIN_ID ? 'active' : ''} onClick={() => selectNetwork(FUSE_CHAIN_ID)}>
            <LogoIcon src={fuseLogo}></LogoIcon>
            <LogoText>Fuse</LogoText>
          </Button>
          <Button
            className={networkId === BINANCE_CHAIN_ID ? 'active' : ''}
            onClick={() => selectNetwork(BINANCE_CHAIN_ID)}
          >
            <LogoIcon src={binanceLogo}></LogoIcon>
            <LogoText>BSC</LogoText>
          </Button>
          <Button
            className={networkId === ETHEREUM_CHAIN_ID ? 'active' : ''}
            onClick={() => selectNetwork(ETHEREUM_CHAIN_ID)}
          >
            <LogoIcon src={ethereumLogo}></LogoIcon>
            <LogoText>Ethereum</LogoText>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  )
}
