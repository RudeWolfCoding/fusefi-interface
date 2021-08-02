import React, { useEffect, useState } from 'react'
import { calculateAPY, getContract } from '../../utils/farm'
import styled from 'styled-components'
import Icon from './icons'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from '../Loaders/rewards'
import { Flex } from 'rebass'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover {
    font-weight: 800;
    background: #111219;
    opacity: 0.85;
    text-orientation: upright;
    height: 100%;
  }
`
const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const Item = styled(Flex)`
  text-align: center;
  margin: auto;
  padding-left: 24px;
  line-height: 10px;
  font-size: 1.15rem;
  font-weight: 300;
  flex-wrap: wrap;
`

const Field = styled(Flex)`
  color: grey;
  display: flex;
`

const SelectButton = styled('div')`
  content: 'Select';
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  padding-left: 16px;
  padding-right: 16px;
  transform-origin: right top 0;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
  border-radius: 12px;
  text-align: center;
  margin: auto;
  position: absolute;
  top: 25%;
  right: 15px;
  color: black;
`

export default function Reward(props: { contract: any; active: boolean }) {
  const [showSelectButton, setShowSelectButton] = useState(false)
  const { promiseInProgress } = usePromiseTracker()
  const [apy, setApy] = useState({
    contractAddress: '',
    address: '',
    reserve0: 0,
    apy: 0,
    start: new Date(),
    duration: 0,
    end: new Date(),
    token0Pool: 0,
    token1Pool: 0
  })

  function toggle() {
    window.location.replace('/#/farm/' + props.contract.contractAddress)
  }

  useEffect(() => {
    trackPromise(
      getContract(props.contract).then(resContract =>
        calculateAPY(resContract, props.contract).then(resApy => setApy(resApy))
      )
    )
  })

  return (
    <Container onMouseEnter={() => setShowSelectButton(true)} onMouseLeave={() => setShowSelectButton(false)}>
      <Item flex={'1 1 25%'} onClick={toggle}>
        <Icon address={props.contract.contractAddress} name={props.contract.token0 + ' - ' + props.contract.token1} />
      </Item>
      {props.active === true ? (
        <Item flex={'1 1 22%'}>
          <Field
            style={{
              padding: '0.5rem',
              color: '#4b4b4b',
              margin: 'auto',
              borderRadius: '999px',
              background: 'linear-gradient(0deg, #d0f7d7, #d0f7d7)'
            }}
          >
            {promiseInProgress ? <Loader /> : apy.apy + '%'}
          </Field>
        </Item>
      ) : null}
      {props.contract.contractAddress === '0xAAb4FB30aD9c20EFFDA712c0fFC24f77b1B5439d' ||
      props.contract.contractAddress === '0xf14D745a4D264255F758B541BB1F61EbC589EA25' ? (
        <Item fontSize={1}>
          <Wrapper>
            <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
              {promiseInProgress ? <Loader /> : apy.token0Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Field>
            <Field>{props.contract.token1}</Field>
          </Wrapper>
          <Wrapper>
            <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
              {promiseInProgress ? <Loader /> : apy.token1Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Field>
            <Field>{props.contract.token0}</Field>
          </Wrapper>
        </Item>
      ) : (
        <Item fontSize={1}>
          <Wrapper>
            <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
              {promiseInProgress ? <Loader /> : apy.token0Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Field>
            <Field>{props.contract.token0}</Field>
          </Wrapper>
          <Wrapper>
            <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
              {promiseInProgress ? <Loader /> : apy.token1Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Field>
            <Field>{props.contract.token1}</Field>
          </Wrapper>
        </Item>
      )}
      <Item fontSize={1}>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {promiseInProgress ? (
              <Loader />
            ) : (
              '$' +
              ((props.contract.rewards / props.contract.duration) * 0.089)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            )}
          </Field>
          <Field>USD / day</Field>
        </Wrapper>
        <Wrapper>
          <Field color={'white'} paddingRight={'5px'} justifyContent={'flex-end'}>
            {promiseInProgress ? (
              <Loader />
            ) : (
              (props.contract.rewards / props.contract.duration)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            )}
          </Field>
          <Field>WFUSE / day</Field>
        </Wrapper>
      </Item>
      <Item flex={'1 1 10%'}>{showSelectButton && <SelectButton onClick={toggle}>Select</SelectButton>}</Item>
    </Container>
  )
}
