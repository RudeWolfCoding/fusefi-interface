import React from 'react'
import styled from 'styled-components'
import appStoreIcon from '../../assets/svg/appstore_button.svg'
import playStoreIcon from '../../assets/svg/googleplay_button.svg'
import fusefiAppIcon from '../../assets/svg/fusefi-app.svg'
import { ExternalLink } from '../../theme'

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`
const ContentWrapper = styled.div`
  margin-right: 10px;
`

const Title = styled.h1`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 0;
`

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`

const AppStoreLink = styled(ExternalLink)`
  display: inline-block;
`

const AppStoreIcon = styled.img``

const FuseAppIcon = styled.img.attrs({
  src: fusefiAppIcon,
  alt: 'Fusefi App'
})`
  height: 100px;
`

export default function FuseCashBanner() {
  return (
    <MainWrapper>
      <ContentWrapper>
        <Title>Works best with Fuse Cash</Title>
        <Text>Download the easiest DeFi wallet and connect using WalletConnect</Text>
        <div>
          <AppStoreLink href="https://get.fuse.cash/mrxn/dfb1a810">
            <AppStoreIcon src={appStoreIcon} alt="App Store" />
          </AppStoreLink>
          <AppStoreLink href="https://get.fuse.cash/mrxn/dfb1a810">
            <AppStoreIcon src={playStoreIcon} alt="Google Play" />
          </AppStoreLink>
        </div>
      </ContentWrapper>
      <FuseAppIcon />
    </MainWrapper>
  )
}
