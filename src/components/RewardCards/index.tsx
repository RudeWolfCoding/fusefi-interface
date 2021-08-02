import React, { useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import Claim from './claim'
import Withdraw from './withdraw'
import Deposit from './deposit'
import { Flex } from 'rebass'

const Wrapper = styled('div')`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  background: #242637;
  min-height: 342px;
  display: flex;
  flex-wrap: wrap;
  padding: 15%;
  padding-top: 2%;
  padding-bottom: 24px;
  border-radius: 12px;
`

const TabGroup = styled.div`
  display: flex;
  border-radius: 16px;
  width: 100%;
  height: 48px;
  margin-bottom: 14px;
  background: #111219;
`

const Tab = styled.button<{ active: any }>`
  flex: 1;
  font-size: 20px;
  cursor: pointer;
  color: white;
  border: 0;
  outline: 0;
  position: relative;
  background: none;
  border-radius: 0;
  ${({ active }) =>
    active &&
    `:before{
      content:"";
      position:absolute;
      width: 95%;
      left:0;
      bottom:0;
      top:0;
      border-radius:16px; 
      padding:3px; 
      background:linear-gradient(110deg, #b1ffbf 7%, #fff16d);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; 
      mask-composite: exclude; 
        }
  `}
`

const types = ['Deposit', 'Withdraw', 'Stats']

interface RewardSelection {
  result: string
  contract: {
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }
}

function RewardsReselect(param: string, result: any, contract: any) {
  switch (param) {
    case 'Deposit':
      return <Deposit data={result} contract={contract} />
    case 'Withdraw':
      return <Withdraw data={result} contract={contract} />
    case 'Stats':
      return <Claim data={result} contract={contract} />
    default:
      return <Deposit data={result} contract={contract} />
  }
}

export default (props: RewardSelection) => {
  const [active, setActive] = useState(types[0])
  const { chainId } = useActiveWeb3React()

  if (chainId === 122) {
    return (
      <Wrapper>
        <TabGroup>
          {types.map(type => (
            <Tab key={type} active={active === type} onClick={() => setActive(type)}>
              {type}
            </Tab>
          ))}
        </TabGroup>
        {RewardsReselect(active, props.result, props.contract)}
      </Wrapper>
    )
  } else {
    return <Flex padding={'15px'}>Please, switch to Fuse Network to interact with LP Farm</Flex>
  }
}
