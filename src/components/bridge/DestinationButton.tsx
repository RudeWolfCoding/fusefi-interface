import React from 'react'
import styled from 'styled-components'
import { Logo } from './styleds'
import { BridgeDirection } from '../../state/bridge/hooks'

export const Button = styled.button<{ isActive?: boolean; colorSelect?: string }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #242637;
  border-radius: 12px;
  border: 2px solid #FFFFFF
  min-width: 160px;
  max-width: 100%;
  border-width: 2px;
  border-style: solid;
  color: ${({ color }) => color};
  font-weight: 500;
  outline: 0;
  
  >span{
    positi;
  }
  &:hover {
    border-color: ${({ color }) => color};
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 130px;
  `}

  > img {
    margin-right: 0.5rem;
  }

  ${({ isActive, color, colorSelect }) =>
    isActive && `border-color: ${color};background: ${colorSelect}; color: white; opacity: 0.`}
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
  bridgeDirection: BridgeDirection
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
