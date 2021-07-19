import React from 'react'
import styled from 'styled-components'
import { useModal } from './useModal'
import { Modal } from './modal'

const Container = styled('div')<{ color: string; txt: string }>`
  display: flex;
  flex-wrap: wrap;
  background: ${({ color }) => color};
  border-radius: 12px;
  min-height: 112px;
  padding: 16px;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
`

const Wrap = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;
`
const BorrowApy = styled('div')`
  display: flex;
  width: 100%;
  margin: 3px;
  margin-bottom: 20px;
  > img {
    opacity: 0.35;
  }
`

const LendApy = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  margin: 3px;
  position: relative;
`

const Icon = styled('div')`
  border-radius: 999px;
  background-color: #ffffff17;
  opacity: 1;
  height: 24px;
  width: 24px;
  cursor: pointer;

  position: relative;
  > img {
    opacity: 1;
    top: 20%;
    right: 22%;
    position: absolute;
  }
`

const BorrowLabel = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 18px;
  > span {
    font-size: 14px;
    font-weight: 500;
  }
`
const LendLabel = styled('div')<{ txt: string }>`
  display: flex;
  width: 100%;
  text-align: center;
  opacity: 0.65;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ txt }) => txt};
`

export default function RewardsApy(props: any){
  const { isShown, toggle } = useModal()
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id.'

  return (
    <Container color={props.color} txt={props.txt}>
      <Wrap>
        <BorrowApy>
          <img src={props.icon} width="18px" height="18px" alt="Currency Icon"></img>{' '}
        </BorrowApy>
        <LendApy
          onClick={() => {
            toggle()
          }}
        >
          <Icon>
            <img src={props.apyIcon} width="14px" height="14px" alt="Apy Icon"></img>
          </Icon>
        </LendApy>
      </Wrap>
      <BorrowLabel>
        {props.data} &nbsp;<span> {props.label}</span>
      </BorrowLabel>
      <LendLabel txt={props.txt}>{props.title}</LendLabel>
      <Modal headerText={props.title} isShown={isShown} hide={toggle} modalContent={content} />
    </Container>
  )
}
