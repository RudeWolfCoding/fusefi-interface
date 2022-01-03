import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import LogoIcon from '../../assets/svg/fusefi-wordmark.svg'
import { ReactComponent as BridgeIcon } from '../../assets/svg/bridge.svg'
import { ReactComponent as PoolIcon } from '../../assets/svg/pool.svg'
import { ReactComponent as SwapIcon } from '../../assets/svg/swap.svg'
import { ReactComponent as FarmIcon } from '../../assets/svg/farm.svg'
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg'
import { ReactComponent as LendingIcon } from '../../assets/svg/lend.svg'
import { ReactComponent as GovernanceIcon } from '../../assets/svg/governance.svg'
import { ReactComponent as Analytics } from '../../assets/svg/analyticsMenu.svg'

import telegram from '../../assets/svg/telegram.svg'
import twitter from '../../assets/svg/twitter.svg'
import github from '../../assets/svg/github.svg'
import { ReactComponent as FUSD } from '../../assets/svg/fuse-dollar.svg'
import useRampWidget from '../../hooks/useRamp'
import Settings from '../../components/Settings'
import { FUSE_CHAIN_ID } from '../../connectors'
import { ExternalLink } from '../../theme'

const activeClassName = 'ACTIVE'
const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  text-align: left;
  z-index: 100;
  position: relative;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Ramp = styled.div`
  cursor: pointer;
  justify-content: space-evenly;
  display: flex;
  width: 80%;
  height: 48px;
  width: 100%;
  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    line-height: 41px;
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  div {
    display: flex;
    img {
      margin: auto;
      margin-right: 10px;
    }
  }
`

const UniIcon = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  > svg {
    padding: 0.35rem;
    padding-bottom: 30px;
  }
  > svg #icon {
    padding: 0.35rem;
    stroke-width: 1px;
    stroke: ${({ theme }) => theme.text2};
    ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 7.5rem;
    `}
  }
  > svg #icon2 {
    padding: 0.35rem;
    stroke-width: 2px;
    fill: ${({ theme }) => theme.text2};
    ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 7.5rem;

    `}
  }
`

const MenuFlyout = styled.span`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 16px;
  z-index: 100;
  color: white;
`

const MenuItem = styled.a`
  width: 100%;
  height: 48px;
  text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 300;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  .icon {
    stroke: white;
    stroke-width: 1;
  }
  .icon2 {
    stroke: white;
    stroke-width: 0;
  }
  color: ${({ theme }) => theme.white};
  :hover {
    cursor: pointer;
    text-decoration: none;
    background-color: rgba(17, 18, 25, 0.4);
  }

  &.${activeClassName} {
    color: white;
    background-color: ${({ theme }) => theme.secondary4};
    .icon {
      stroke-width: 2px;
    }
    .icon2 {
      stroke: white;
      stroke-width: 2px;
    }
  }
`

const MenuItemInternal = styled(NavLink).attrs({
  activeClassName
})`
  width: 100%;
  height: 48px;
  text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 300;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  .icon {
    stroke: white;
    stroke-width: 1;
  }
  .icon2 {
    stroke: white;
    stroke-width: 0;
  }
  color: ${({ theme }) => theme.white};
  :hover {
    cursor: pointer;
    text-decoration: none;
    background-color: rgba(17, 18, 25, 0.4);
  }

  &.${activeClassName} {
    color: white;
    font-weight: 500;
    background-color: ${({ theme }) => theme.secondary4};
    .icon {
      stroke-width: 2px;
    }
    .icon2 {
      stroke: white;
      stroke-width: 2px;
    }
  }
`

const MenuItemExternal = styled(ExternalLink)`
  width: 100%;
  height: 48px;
  text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 300;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  .icon {
    stroke: white;
    stroke-width: 1;
  }
  .icon2 {
    stroke: white;
    stroke-width: 0;
  }
  color: ${({ theme }) => theme.white};
  :hover {
    cursor: pointer;
    text-decoration: none;
    background-color: rgba(17, 18, 25, 0.4);
  }
`

const MenuItemWrapper = styled.div`
  display: flex;
  height: 100%
  align-items: center;
  overflow: hidden;
  width: 100%;
`

const MenuWrapper = styled.div`
  display: block;
  height: 62%;
  width: 100%;
  overflow: auto;
  position: relative;
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-button {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-top: 60px solid green;
    border-radius: 11px;
    border-radius: 999px;
    height: 32px;
    transition: 0.5s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(0deg, #f3fc1f -10.87%, #3ad8a4 108.7%);
  }

  &::-webkit-scrollbar-track {
    background: #8f9197;
    border-radius: 666;
    margin-top: 110px;
  }

  &::-webkit-scrollbar-track:hover {
    background: #ffffff;
  }

  &::-webkit-scrollbar-track:active {
    background: #ffffff;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`

const SubMenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-end;
  height: 40%;
  width: 100%;
`

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  width: 100%;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 16px;
`

const Logo = styled.img.attrs({
  src: LogoIcon,
  width: '210px',
  alt: 'FuseFi Logo'
})`
  padding: 25px 0 30px 0px;
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  padding-left: 40px;
`
const Item = styled(ExternalLink)`
  color: #8f9197;
  padding: 4px 0;
  :hover {
    color: ${({ theme }) => theme.white};
    cursor: pointer;
    text-decoration: none;
  }

  :not(:last-child) {
    margin-right: 8px;
  }
`
const WhiteText = styled.span`
  color: #b5b9d3;
  font-size: 10px;
  margin-left: 5px;
  font-weight: 500;
  line-height: 14px;
`
const GreyText = styled.span`
  color: gray;
`
export default function Sidebar() {
  const node = useRef<HTMLDivElement>()
  const openRampWidget = useRampWidget()

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <MenuFlyout>
        <MenuWrapper>
          <UniIcon>
            <Logo />
          </UniIcon>
          <MenuItemInternal to="/home">
            <MenuItemWrapper>
              <IconWrapper>
                <HomeIcon />
              </IconWrapper>
              <span> Home</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/swap">
            <MenuItemWrapper>
              <IconWrapper>
                <SwapIcon />
              </IconWrapper>
              <span>Swap</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/pool">
            <MenuItemWrapper>
              <IconWrapper>
                <PoolIcon />
              </IconWrapper>
              <span>Pool</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/bridge">
            <MenuItemWrapper>
              <IconWrapper>
                <BridgeIcon />
              </IconWrapper>
              <span>Bridge</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to={`/farm/${FUSE_CHAIN_ID}`}>
            <MenuItemWrapper>
              <IconWrapper>
                <FarmIcon />
              </IconWrapper>
              <span>Farm</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/lending">
            <MenuItemWrapper>
              <IconWrapper>
                <LendingIcon />
              </IconWrapper>
              <span>Lending</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/wallet">
            <MenuItemWrapper>
              <IconWrapper>
                <GovernanceIcon />
              </IconWrapper>
              <GreyText>Governance</GreyText>
              <WhiteText>soon</WhiteText>
            </MenuItemWrapper>
          </MenuItemInternal>
        </MenuWrapper>
        <SubMenuWrapper>
          <MenuItemExternal id="link" href="https://info.fuseswap.com/">
            <MenuItemWrapper>
              <IconWrapper>
                <Analytics />
              </IconWrapper>
              <span>Analytics</span>
            </MenuItemWrapper>
          </MenuItemExternal>
          <Ramp onClick={openRampWidget}>
            <MenuItem>
              <MenuItemWrapper>
                <IconWrapper>
                  <FUSD />
                </IconWrapper>
                <span>Get Fuse Dollar</span>
              </MenuItemWrapper>
            </MenuItem>
          </Ramp>
          <Settings />

          <Links>
            <Item id="link" href="https://github.com/fuseio">
              <img src={github} alt="Github icon" />
            </Item>
            <Item id="link" href="https://t.me/fuse_fi">
              <img src={telegram} alt="Telegram icon" />
            </Item>
            <Item id="link" href="https://twitter.com/Fuse_Fi">
              <img src={twitter} alt="Twitter icon" />
            </Item>
          </Links>
        </SubMenuWrapper>
      </MenuFlyout>
    </StyledMenu>
  )
}
