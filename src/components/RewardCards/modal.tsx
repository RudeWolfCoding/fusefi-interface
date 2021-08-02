import React, { useState } from 'react'
import styled from 'styled-components'
import Questionmark from '../../assets/svg/questionmark.svg'
import { ButtonPrimary } from '../Button'
import Modal from '../Modal'

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
export const StyledModal = styled.div`
  z-index: 100;
  padding: 24px;
  background: #242637;
  position: relative;
  margin: auto;
  border-radius: 12px;
`
export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
`

export const HeaderText = styled.div`
  color: #fff;
  align-self: center;
  color: lightgray;
`

export const Content = styled.div`
  padding-bottom: 15px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  > h1 {
    font-size: 24px;
    font-weight: 600;
  }
  > p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
`

const Item = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  position: relative;
`

interface Estimate {
  estimate: string
}

export default function EstimatedReward(props: Estimate) {
  const [isOpen, setOpen] = useState(false)
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id.'

  return (
    <Container>
      <Wrapper>
        <span>Your Estimated rewards</span>
        <Icon
          onClick={() => {
            setOpen(true)
          }}
        >
          <img src={Questionmark} width="14px" height="14px" alt="Question icon"></img>
        </Icon>
      </Wrapper>
      <p>
        <span>{props.estimate}</span>&nbsp;<span> - WFUSE</span>
      </p>
      <Modal
        maxHeight={90}
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false)
        }}
      >
        <Wrapper aria-modal aria-labelledby={'APY'} tabIndex={-1} role="dialog">
          <StyledModal>
            <Header>
              <HeaderText>
                <Item
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <Icon>
                    <img src={Questionmark} width="28px" height="28px" alt="Modal Icon"></img>
                  </Icon>
                </Item>
              </HeaderText>
            </Header>
            <Content>
              <h1>What does &quot; APY &quot; mean?</h1>
              <p>{content}</p>
            </Content>
            <ButtonPrimary
              onClick={() => {
                setOpen(false)
              }}
            >
              Done
            </ButtonPrimary>
          </StyledModal>
        </Wrapper>
      </Modal>{' '}
    </Container>
  )
}
