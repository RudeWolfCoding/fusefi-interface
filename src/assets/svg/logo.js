import React from 'react'
import image from './logo.svg'
import styled from 'styled-components'

const Logos = styled.div`
  > img {
    padding: 24px;
    padding-bottom: 0px;
  }
`

function Logo() {
  return (
    <Logos>
      <img src={image} width="155px" alt="Fuse Logo" />
    </Logos>
  )
}

export default Logo
