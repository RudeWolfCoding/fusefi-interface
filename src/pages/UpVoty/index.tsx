import React from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const Frame = styled('iframe')`
  width: 100%;
  min-height: 700px;
  overflow-x:hidden;
  overflow-Y:hidden;
  border: 0px solid;
`
export default function UpVoty() {

  return (
      <AppBody>
        <Wrapper>
          <Frame scrolling="no" src="https://roadmap.fuse.io"></Frame>
        </Wrapper>
      </AppBody>

  )
}
