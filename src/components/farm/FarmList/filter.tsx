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
  border-radius: 100px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  width: 8rem;
  position: relative;
  margin: 6px 5px 6px 5px;
  z-index: 100;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  &.${activeClassName} {
    font-weight: bold;
    border: none;
    text-align: center;
    background: linear-gradient(93.58deg, #3ad8a4 -105.35%, #f3fc1f 103.54%);
    border-radius: 15px;
    color: ${({ theme }) => theme.black};
  }
`
const LogoIcon = styled.img`
  padding: 0 5px;
  height: 26px;
`

const LogoText = styled.small`
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
`
const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 5px 0;
  background: #4a4a4e;
  border-radius: 20px;
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

const SubTitle = styled.small`
  font-weight: normal;
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
        <SubTitle>Showing pools on</SubTitle>
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
