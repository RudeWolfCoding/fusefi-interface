import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavMenuOpen, useToggleNavMenu } from '../../state/application/hooks'
import { ReactComponent as CloseIcon } from '../../assets/svg/ham_menu_close.svg'
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg'
import { ReactComponent as BridgeIcon } from '../../assets/svg/bridge.svg'
import { ReactComponent as PoolIcon } from '../../assets/svg/pool.svg'
import { ReactComponent as SwapIcon } from '../../assets/svg/swap.svg'
import { ReactComponent as FarmIcon } from '../../assets/svg/farm.svg'
import { ReactComponent as LendingIcon } from '../../assets/svg/lending.svg'
import SettingsTab from '../Settings'

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  background-color: ${({ theme }) => theme.bg7};
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
  z-index: 150;
`

const Header = styled.div`
  padding: 1rem;
`

const Body = styled.div``

const Footer = styled.div`
  #open-settings-dialog-button {
    border-top: 0;
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  color: #b5b9d3;
  text-decoration: none;
  font-weight: 500;
`

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 40px;
`

const IconWrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;
  height: 20px;
  width: 20px;
`

export default function MobileNav() {
  const navMenuOpen = useNavMenuOpen()
  const toggleNavMenu = useToggleNavMenu()

  return (
    <Wrapper isOpen={navMenuOpen}>
      <Header>
        <StyledCloseIcon onClick={() => toggleNavMenu()} />
      </Header>
      <Body>
        <StyledLink to="/home" onClick={() => toggleNavMenu()}>
          <LinkContent>
            <IconWrapper>
              <HomeIcon />
            </IconWrapper>
            Home
          </LinkContent>
        </StyledLink>
        <StyledLink to="/swap" onClick={() => toggleNavMenu()}>
          <LinkContent>
            <IconWrapper>
              <SwapIcon />
            </IconWrapper>
            Swap
          </LinkContent>
        </StyledLink>
        <StyledLink to="/pool" onClick={() => toggleNavMenu()}>
          <LinkContent>
            <IconWrapper>
              <PoolIcon />
            </IconWrapper>
            Pool
          </LinkContent>
        </StyledLink>
        <StyledLink to="/bridge" onClick={() => toggleNavMenu()}>
          <LinkContent>
            <IconWrapper>
              <BridgeIcon />
            </IconWrapper>
            Bridge
          </LinkContent>
        </StyledLink>
        <StyledLink to="/farm" onClick={() => toggleNavMenu()}>
          <LinkContent>
            <IconWrapper>
              <FarmIcon />
            </IconWrapper>
            Farm
          </LinkContent>
        </StyledLink>
        <StyledLink to="/lending" onClick={() => toggleNavMenu()}>
          <LinkContent>
            <IconWrapper>
              <LendingIcon />
            </IconWrapper>
            Lending
          </LinkContent>
        </StyledLink>
      </Body>
      <Footer>
        <SettingsTab />
      </Footer>
    </Wrapper>
  )
}
