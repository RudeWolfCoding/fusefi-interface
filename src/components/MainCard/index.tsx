import React from 'react'
import styled from 'styled-components'

export const SwapWrapper = styled('div')`
  position: relative;
  padding: 1rem;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #000000;
  border-radius: 16px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function MainCard({ children }: { children: React.ReactNode }) {
  return <SwapWrapper>{children}</SwapWrapper>
}
