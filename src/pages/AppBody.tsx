import React from 'react'
import styled from 'styled-components'
import Card from '../components/MainCard'
import News from '../components/News'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

export const BodyWrapper = styled.div`
  position: relative;
  width: 100%;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return (
  <BodyWrapper>
    <Menu></Menu>
    <Card>{children}</Card>
    <News/>
    <Footer/>
  </BodyWrapper>
  )
}
