import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { BINANCE_CHAIN_ID, ETHEREUM_CHAIN_ID, FUSE_CHAIN_ID } from '../../../connectors'
import fuseLogo from '../../../assets/svg/logos/fuse-small-logo.svg'
import ethereumLogo from '../../../assets/svg/logos/ethereum-small-logo.svg'
import binanceLogo from '../../../assets/svg/logos/binance-small-logo.svg'

const Container = styled('div')`
  display: flex;
  justify-content: flex-end;
  position: relative;
  max-width: 100%;
  margin-bottom: 24px;
  border: solid 2px #000000;
  border-radius: 5px;
`
const activeClassName = 'active'

const Button = styled('div').attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: flex-start;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  width: 126px;
  position: relative;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  &.${activeClassName} {
    font-weight: 500;
    border: none;
    color: ${({ theme }) => theme.text1};
    :before {
      background: linear-gradient(90deg, #3ad889, #f3fc1f);
      content: '';
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      border-radius: 5px;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  &:nth-child(2) {
    margin: 0 7px;
  }
`
const LogoIcon = styled.img`
  padding: 0 10px;
`

const LogoText = styled.small`
  padding: 0 10px;
`
const ButtonWrapper = styled.div`
  display: flex;
  margin: 5px 0;
`
interface Filter {
  chainId: number
  callBack: any
}

export default function Filter({ callBack, chainId }: Filter) {
  const [chain, setChain] = useState<number>(chainId)

  function selectChain(chainId: number) {
    setChain(chainId)
    callBack(chainId)
  }

  return (
    <Container>
      <div>
        <small>Showing pool on</small>
        <ButtonWrapper>
          <Button className={chain === FUSE_CHAIN_ID ? 'active' : ''} onClick={() => selectChain(FUSE_CHAIN_ID)}>
            <LogoIcon src={fuseLogo}></LogoIcon>
            <LogoText>Fuse</LogoText>
          </Button>
          <Button className={chain === BINANCE_CHAIN_ID ? 'active' : ''} onClick={() => selectChain(BINANCE_CHAIN_ID)}>
            <LogoIcon src={binanceLogo}></LogoIcon>
            <LogoText>BSC</LogoText>
          </Button>
          <Button className={chain === ETHEREUM_CHAIN_ID ? 'active' : ''} onClick={() => selectChain(ETHEREUM_CHAIN_ID)}>
            <LogoIcon src={ethereumLogo}></LogoIcon>
            <span>Ethereum</span>
          </Button>
        </ButtonWrapper>
      </div>
    </Container>
  )
}
