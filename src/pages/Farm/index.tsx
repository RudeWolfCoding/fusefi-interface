import React from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import InfoPanel from '../../components/farm/FarmTabs/infoPanel'
import vector from '../../assets/svg/vector.svg'
import rewards from '../../assets/svg/rewardsAcc.svg'
import Icon from '../../components/farm/FarmList/icons'
import apyPurple from '../../assets/svg/questionmark.svg'
import apyGreen from '../../assets/svg/questionmark3.svg'
import FarmTabs from '../../components/farm/FarmTabs'
import { useActiveWeb3React } from '../../hooks'
import InfoDeposist from '../../components/farm/FarmTabs/infoDeposit'
import { useFarm } from '../../state/farm/hooks'
import { tryFormatAmount } from '../../utils'

const Container = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 24%;
  padding-right: 24%;
  margin-bottom: 50px;
  text-align: left;
  z-index: 3;
  > span {
    font-size: 32px;
    font-weight: 600;
    line-height: 38px;
  }
`

const Wrapper = styled('div')`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  > span {
    font-size: 32px;
    font-weight: 500;
  }
`
const Item = styled('div')`
  padding: 4px;
  width: 33%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export default function Farm(props: RouteComponentProps<{ address: string }>) {
  const {
    match: {
      params: { address }
    }
  } = props

  const { account } = useActiveWeb3React()
  const farm: any = useFarm(address)

  return (
    <AppBody>
      {account ? (
        <Container>
          <Wrapper style={{ paddingBottom: '25px' }}>
            <Icon name={''} pairName={farm?.pairName} /> <span>{farm?.pairName}</span>
          </Wrapper>
          <Wrapper style={{ paddingBottom: '10px' }}>
            <Item>
              <InfoPanel
                title={'Deposit APY'}
                data={(farm?.rewardsInfo[0].apyPercent * 100).toFixed(2)}
                icon={vector}
                apyIcon={apyPurple}
                label={'%'}
                txt={'#8E6CC0'}
                color={'#473660'}
              />{' '}
            </Item>
            <Item>
              <InfoDeposist token={address} pair={farm?.token0?.symbol + '/' + farm?.token1?.symbol} />
            </Item>
            <Item>
              <InfoPanel
                title={'Accruded Rewards'}
                data={tryFormatAmount(farm?.rewardsInfo[0]?.accuruedRewards, 18) ?? ''}
                apyIcon={apyGreen}
                label={' WFUSE'}
                icon={rewards}
                txt={'#1C9E7E'}
                color={'#0E4F3F'}
              />
            </Item>
          </Wrapper>
          <Wrapper style={{ paddingLeft: '4px', paddingRight: '10px' }}>
            <FarmTabs farm={farm} />
          </Wrapper>
        </Container>
      ) : (
        'Loading'
      )}
    </AppBody>
  )
}
