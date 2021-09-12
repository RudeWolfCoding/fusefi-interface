import { ChainId, Token } from '@fuseio/fuse-swap-sdk'
import React, { useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import { useTokenBalance } from '../../../state/wallet/hooks'
import { ButtonPrimary } from '../../Button'
import Modal from '../../Modal'
import Questionmark from '../../../assets/svg/questionmark.svg'
import { Content, Header, HeaderText, StyledModal } from './modal'
import styled from 'styled-components'
import apyGreen from '../../../assets/svg/questionmark2.svg'
import deposits from '../../../assets/svg/deposits.svg'

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
    white-space: pre-wrap;
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

interface apy {
  token: string
  pair: string
}
export default function RewardsAPY(props: apy) {
  const { account } = useActiveWeb3React()
  const chainId = 122 as ChainId
  const token = new Token(chainId, props.token, 18)
  const userPoolBalance = useTokenBalance(account ?? undefined, token)
  const [isOpen, setOpen] = useState(false)
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id.'

  return (
    <>
      <Container color={'#034253'} txt={'#8E6CC0'}>
        <Wrapper>
          <Item>
            <img src={deposits} width="18px" height="18px" alt="APY Icon"></img>{' '}
          </Item>
          <IconWrapper
            onClick={() => {
              setOpen(true)
            }}
          >
            <Icon>
              <img src={apyGreen} width="14px" height="14px" alt="APY Icon"></img>
            </Icon>
          </IconWrapper>
        </Wrapper>
        {userPoolBalance ? (
          <Label>
            {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
            <span> {props.pair}</span>
          </Label>
        ) : (
          <Label>
            0.00
            <span> {props.pair}</span>
          </Label>
        )}
        <Title txt={'#0684A6'}>{'Your Deposits'}</Title>
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
    </>
  )
}
