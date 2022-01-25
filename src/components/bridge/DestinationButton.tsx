import React from 'react'
import styled from 'styled-components'
import { Logo } from './styleds'
import { BridgeDirection } from '../../state/bridge/hooks'

export const Button = styled.button<{ isActive?: boolean; colorSelect?: string }>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  padding: 1rem;
  width: 165px;
  height: 37px;
  margin: 2px;
  font-size: 1rem;
  padding: 0.5rem 3rem;
  color: white;
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 0.5px white;
  filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.1));
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(317deg, #3ad889ab -6.17%, #f3fc1f9c 108.46%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #232535 inset;

  &:hover {
    color: ${({ color }) => color};
    border-color: transparent;
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 130px;
  `}

  > img {
    margin-right: 0.5rem;
  }

  ${({ isActive }) =>
    isActive &&
    `  border: solid 1.5px transparent;
    box-shadow: 2px 1000px 1px rgb(0 0 0 / 62%) inset;`}
`

export default function DestinationButton({
  text,
  logoSrc,
  color,
  colorSelect,
  selectedBridgeDirection,
  handleClick,
  bridgeDirection
}: {
  text: string
  logoSrc: string
  color: string
  colorSelect: string
  selectedBridgeDirection?: BridgeDirection
  handleClick: (...args: any[]) => void
  bridgeDirection?: BridgeDirection
}) {
  return (
    <Button
      color={color}
      colorSelect={colorSelect}
      isActive={bridgeDirection === selectedBridgeDirection}
      onClick={() => handleClick(bridgeDirection)}
    >
      <Logo src={logoSrc} width={32} /> <span>{text}</span>
    </Button>
  )
}
