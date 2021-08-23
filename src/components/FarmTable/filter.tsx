import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Container = styled('div')`
  display: flex;
  position: relative;
  width: 25%;
  margin-top: 32px;
  margin-bottom: 24px;
  justify-content: space-around;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #000000;
  border-radius: 16px;
`
const activeClassName = 'active'

const Button = styled('div').attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;
  width: 100%;
  position: relative;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    :before {
      content: '';
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      border-radius: 16px;
      padding: 3px;
      background: linear-gradient(110deg, #b1ffbf 7%, #fff16d);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }
`
interface Filter {
  callBack: any
  active: boolean
}

export default function Filter(props: Filter) {
  const [isActive, setActive] = useState(true)

  function toggle(active: boolean) {
    setActive(active)
    props.callBack(active)
  }

  return (
    <Container>
      <Button
        className={isActive ? 'active' : ''}
        onClick={() => {
          toggle(true)
        }}
      >
        Active
      </Button>
      <Button className={!isActive ? 'active' : ''} onClick={() => toggle(false)}>
        Expired
      </Button>
    </Container>
  )
}
