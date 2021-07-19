import React from 'react'
import styled from 'styled-components'

const HeaderFrame = styled.div`
  padding-right: 2.6%;
  width: 100%;
  top: 0;
  z-index: 3;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function goBack(url: string) {
  window.location.replace(url)
}

export default function BackToButton(props: any) {
  return (
    <HeaderFrame
      onClick={() => {
        goBack(props.url)
      }}
    >
      &#8592; Back to the list
    </HeaderFrame>
  )
}
