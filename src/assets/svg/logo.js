import React from 'react'
import image from './fusefi-logo.svg'
import styled from 'styled-components'

const Img = styled.img.attrs({
  src: image,
  width: '130px',
  alt: 'FuseFi Logo'
})`
  padding: 24px 0 30px 24px;
`

function Logo() {
  return <Img />
}

export default Logo
