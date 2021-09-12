import React, { useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../../hooks'
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

const tabs = ['Deposit', 'Withdraw', 'Stats']

function FarmTab(tab: string, farm: any) {
  switch (tab) {
    case 'Deposit':
      return <Deposit farm={farm} />
    case 'Withdraw':
      return <Withdraw farm={farm} />
    case 'Stats':
      return <Claim farm={farm} />
    default:
      return <div />
  }
}

export default ({ farm }: any) => {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { chainId } = useActiveWeb3React()
  if (chainId === 122) {
    return (
      <Wrapper>
        <TabGroup>
          {tabs.map(tab => (
            <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </Tab>
          ))}
        </TabGroup>
        {FarmTab(activeTab, farm)}
      </Wrapper>
    )
  } else {
    return <Flex padding={'15px'}>Please, switch to Fuse Network to interact with LP Farm</Flex>
  }
}
