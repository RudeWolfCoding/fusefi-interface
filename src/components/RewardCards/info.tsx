import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from '../Button'
import Modal from '../Modal'
import Questionmark from '../../assets/svg/questionmark.svg'
import { Content, Header, HeaderText, StyledModal } from './modal'

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

const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;
`
const Item = styled('div')`
  display: flex;
  width: 100%;
  margin: 3px;
  margin-bottom: 20px;
  > img {
    opacity: 0.35;
  }
`

const IconWrapper = styled('div')`
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

const Label = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 18px;
  > span {
    font-size: 14px;
    font-weight: 500;
  }
`
const Title = styled('div')<{ txt: string }>`
  display: flex;
  width: 100%;
  text-align: center;
  opacity: 0.65;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ txt }) => txt};
`

const TitleModal = styled(HeaderText)`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  position: relative;
`

const IconModal = styled('div')`
  border-radius: 999px;
  background-color: #ffffff1a;
  height: 48px;
  width: 48px;
  position: relative;
  > img {
    opacity: 0.5;
    position: absolute;
    top: 20%;
    right: 20%;
    position: absolute;
  }
`
export default function RewardsAPY(props: any) {
  const [isOpen, setOpen] = useState(false)
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id.'

  return (
    <Container color={props.color} txt={props.txt}>
      <Wrapper>
        <Item>
          <img src={props.icon} width="18px" height="18px" alt="APY Icon"></img>{' '}
        </Item>
        <IconWrapper
          onClick={() => {
            setOpen(true)
          }}
        >
          <Icon>
            <img src={props.apyIcon} width="14px" height="14px" alt="APY Icon"></img>
          </Icon>
        </IconWrapper>
      </Wrapper>
      <Label>
        {props.data} &nbsp;<span> {props.label}</span>
      </Label>
      <Title txt={props.txt}>{props.title}</Title>
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
              <TitleModal
                onClick={() => {
                  setOpen(false)
                }}
              >
                <IconModal>
                  <img src={Questionmark} width="28px" height="28px" alt="APY Icon"></img>
                </IconModal>
              </TitleModal>
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
        </Wrapper>{' '}
      </Modal>
    </Container>
  )
}
