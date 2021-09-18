import React, { useCallback } from 'react'
import styled from 'styled-components'
import Icon from '../FarmList/icons'
// import { Flex } from 'rebass'
import { tryFormatDecimalAmount, tryFormatPercentageAmount } from '../../../utils'
import { Farm } from '../../../constants/farms'
import { useHistory } from 'react-router'

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   flex-wrap: wrap;
//   border-bottom: 1px solid black;
//   font-weight: 800;
//   :hover {
//     background: #111219;
//   }
// `
// const Wrapper = styled('div')`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   padding-top: 10px;
//   padding-bottom: 10px;
// `

// const Column = styled(Flex)`
//   text-align: center;
//   margin: auto;
//   padding-left: 24px;
//   line-height: 10px;
//   font-size: 1.15rem;
//   font-weight: 300;
//   flex-wrap: wrap;
// `

// const Field = styled(Flex)`
//   color: grey;
//   display: flex;
// `

const Tr = styled.tr`
  border-bottom: 1px solid #111219;

  :hover {
    background-color: #111219;
  }
`

const Td = styled.td`
  padding: 12px 16px;
`

const Button = styled.button`
  content: 'Select';
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  padding-left: 16px;
  padding-right: 16px;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
  border: 0;
  border-radius: 12px;
  text-align: center;
  color: black;
  cursor: pointer;
`

const Text = styled.div`
  font-size: 14px;
`

const GreyText = styled.span`
  color: #a7a8af;
`

const Badge = styled.div`
  display: inline-block;
  background-color: #d0f7d7;
  padding: 5px 10px;
  border-radius: 100px;
  color: #000;
`

export default function FarmListItem({ farm }: { farm: Farm }) {
  const history = useHistory()

  const selectFarm = useCallback(() => {
    history.push(`/farm/${farm.contractAddress}`)
  }, [farm.contractAddress, history])

  return (
    <Tr key={farm.contractAddress}>
      <Td style={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="" pairName={farm.pairName} /> <br />
        {farm.pairName}
      </Td>
      <Td style={{ textAlign: 'center' }}>
        <Badge>{farm.rewardsInfo ? tryFormatPercentageAmount(farm.rewardsInfo[0].apyPercent) : 0}%</Badge>
      </Td>
      <Td style={{ textAlign: 'right' }}>
        <Text style={{ marginBottom: '2px' }}>
          {tryFormatDecimalAmount(farm.reserve0, 18)} <GreyText>{farm.token0?.symbol}</GreyText>
        </Text>
        <Text>
          {tryFormatDecimalAmount(farm.reserve1, 18)} <GreyText>{farm.token1?.symbol}</GreyText>
        </Text>
      </Td>
      <Td style={{ textAlign: 'right' }}>
        <Text style={{ marginBottom: '2px' }}>
          0 <GreyText>USD / day</GreyText>
        </Text>
        <Text>
          0 <GreyText>FUSE / day</GreyText>
        </Text>
      </Td>
      <Td style={{ textAlign: 'center' }}>
        <Button onClick={selectFarm}>Select</Button>
      </Td>
    </Tr>
  )
}
