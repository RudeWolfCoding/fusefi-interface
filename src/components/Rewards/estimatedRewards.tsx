import React from 'react'
import styled from 'styled-components'
import Questionmark from '../../assets/svg/questionmark.svg'
import { ShowModal } from '../../hooks/showModal'
import { Modal } from './modal'

const Icon = styled('div')`
  border-radius: 999px;
  background-color: #ffffff1a;
  height: 24px;
  width: 24px;
  position: relative;
  cursor: pointer;
  > img {
    opacity: 0.5;
    position: absolute;
    top: 20%;
    right: 22%;
    position: absolute;
  }
`

const Container = styled('div')`
  background: #111219;
  border-radius: 16px;
  display: flex;
  padding: 14px;
  flex-direction: column;
  margin: auto;
  margin-bottom: 24px;
  width: 100%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
  > p {
    color: #9fa3c9;
    font-size: 14px;
    margin: 2px;
    > span {
      font-size: 16px;
      color: white;
    }
  }
`
const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: space-between;
  font-size: 14px;
  color: #9fa3c9;
  margin: 3px;
  position: relative;
`

export default function EstimatedReward(props: any) {
  const { isShown, toggle } = ShowModal()
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id.'

  return (
    <Container>
      <Wrapper>
        <span>Your Estimated rewards</span>
        <Icon onClick={toggle}>
          <img src={Questionmark} width="14px" height="14px" alt="Question icon"></img>
        </Icon>
      </Wrapper>
      <p>
        <span>{props.estimate}</span>&nbsp;<span> - WFUSE</span>
      </p>
      <Modal headerText={'Estimated Rewards'} isShown={isShown} hide={toggle} modalContent={content} />
    </Container>
  )
}
