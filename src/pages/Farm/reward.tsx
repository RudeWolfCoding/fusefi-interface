import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import Apy from '../../components/RewardCards/info'
import vector from '../../assets/svg/vector.svg'
import deposits from '../../assets/svg/deposits.svg'
import rewards from '../../assets/svg/rewardsAcc.svg'
import Icon from '../../components/FarmTable/icons'
import apyPurple from '../../assets/svg/questionmark.svg'
import apyBlue from '../../assets/svg/questionmark2.svg'
import apyGreen from '../../assets/svg/questionmark3.svg'
import Reselect from '../../components/RewardCards'
import { useActiveWeb3React } from '../../hooks'
import Config from '../../constants/abis/config.json'
import { fetchStakerInfo, fetchStats } from '../../utils/farm'
import { getLPBalance } from '../../utils/rewards'
import { Reward, RewardObj, User, UserObj } from '../../utils/farm/constants'

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
    line-height: 54px;
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

export default function FarmReselect(props: RouteComponentProps<{ address: string }>) {
  const {
    match: {
      params: { address }
    }
  } = props
  const obj: { [index: string]: any } = Config[0].contracts.fuse
  const { account, library } = useActiveWeb3React()
  const [result, setResult] = useState<Reward>(RewardObj)
  const [user, setUser] = useState<User>(UserObj)

  useEffect(() => {
    getLPBalance(obj[address].LPToken, account).then(res => {
      setUser({ ...user, lpAvailable: res })
    })

    fetchStakerInfo(address, library?.provider, 'multi', account ? account : '').then(res =>
      setUser({
        ...user,
        lpDeposited: (res[0] / 1000000000000000000).toFixed(2)
      })
    )

    fetchStats(
      account ? account : '',
      obj[address].LPToken,
      obj[address].contractAddress,
      obj[address].type,
      library?.provider
    ).then(res => setResult({ ...res, ...obj[address] }))
    console.log(result)
  }, [address, account, library, obj])

  return (
    <AppBody>
      <Container>
        <Wrapper style={{ paddingBottom: '25px' }}>
          <Icon name={''} pairName={obj[address].pairName} /> <span>{obj[address].pairName}</span>
        </Wrapper>
        <Wrapper>
          <Item>
            <Apy
              title={'Deposit APY'}
              data={(result.rewardsInfo[0].apyPercent * 100).toFixed(2) + '%'}
              icon={vector}
              apyIcon={apyPurple}
              txt={'#8E6CC0'}
              color={'#473660'}
            />{' '}
          </Item>
          <Item>
            <Apy
              title={'Your Deposits'}
              data={user.lpDeposited}
              apyIcon={apyBlue}
              label={obj[address].pairName}
              icon={deposits}
              txt={'#0684A6'}
              color={'#034253'}
            />
          </Item>
          <Item>
            <Apy
              title={'Accruded Rewards'}
              data={(result.rewardsInfo[0].accuruedRewards / 1000000000000000000).toFixed(2)}
              apyIcon={apyGreen}
              label={'WFUSE'}
              icon={rewards}
              txt={'#1C9E7E'}
              color={'#0E4F3F'}
            />
          </Item>
        </Wrapper>
        <Wrapper style={{ paddingLeft: '4px', paddingRight: '10px' }}>
          <Reselect result={user} contract={result} />
        </Wrapper>
      </Container>
    </AppBody>
  )
}
