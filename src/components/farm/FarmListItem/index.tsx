import React, { useCallback } from 'react'
import styled from 'styled-components'
import Icon from '../FarmList/icons'
import { tryFormatDecimalAmount, tryFormatPercentageAmount } from '../../../utils'
import { Farm } from '../../../constants/farms'
import { Link, useHistory } from 'react-router-dom'

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

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export default function FarmListItem({ farm }: { farm: Farm }) {
  const history = useHistory()

  const farmPath = `/farm/${farm.contractAddress}`

  const selectFarm = useCallback(() => {
    history.push(farmPath)
  }, [farmPath, history])

  return (
    <Tr key={farm.contractAddress}>
      <Td style={{ display: 'flex', alignItems: 'center' }}>
        <StyledLink to={farmPath}>
          <Icon name="" pairName={farm.pairName} />
          {farm.pairName}
        </StyledLink>
      </Td>
      <Td style={{ textAlign: 'center' }}>
        <Badge>{farm.rewardsInfo ? tryFormatPercentageAmount(farm.rewardsInfo[0].apyPercent) : 0}%</Badge>
      </Td>
      <Td style={{ textAlign: 'right' }}>
        <Text>{tryFormatDecimalAmount(farm.totalStaked, 18, 10)}</Text>
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
          {farm.rewardsUSDPerDay?.toFixed(0)} <GreyText>USD / day</GreyText>
        </Text>
        <Text>
          {farm.rewardsPerDay?.toFixed(0)} <GreyText>FUSE / day</GreyText>
        </Text>
      </Td>
      <Td style={{ textAlign: 'center' }}>
        <Button onClick={selectFarm}>Select</Button>
      </Td>
    </Tr>
  )
}
