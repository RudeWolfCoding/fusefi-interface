import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import InfoPanel from '../../components/RewardCards/infoPanel'
import vector from '../../assets/svg/vector.svg'
import rewards from '../../assets/svg/rewardsAcc.svg'
import Icon from '../../components/FarmTable/icons'
import apyPurple from '../../assets/svg/questionmark.svg'
import apyGreen from '../../assets/svg/questionmark3.svg'
import Reselect from '../../components/RewardCards'
import { useActiveWeb3React } from '../../hooks'
import Config from '../../constants/abis/config.json'
import { fetchStats } from '../../utils/farm'
import { Reward, RewardObj, User, UserObj } from '../../utils/farm/constants'
import { formatUnits } from 'ethers/lib/utils'
import { useTokenBalance } from '../../state/wallet/hooks'
import { ChainId, Token } from '@fuseio/fuse-swap-sdk'
import InfoDeposist from '../../components/RewardCards/infoDeposit'

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

export default function FarmReselect(props: RouteComponentProps<{ address: string; LP: string }>) {
  const {
    match: {
      params: { address, LP }
    }
  } = props
  const obj: { [index: string]: any } = Config[0].contracts.fuse
  const { account, library } = useActiveWeb3React()
  const [result, setResult] = useState<Reward>(RewardObj)
  const [user, setUser] = useState<User>(UserObj)
  const chainId = 122 as ChainId
  const userPoolBalance = useTokenBalance(account ?? undefined, new Token(chainId, address, 18))
  const userBalance = useTokenBalance(account ?? undefined, new Token(chainId, LP, 18))

  useEffect(() => {
    console.log(account)
    setUser({
      ...user,
      lpAvailable: userBalance ? userBalance.toSignificant(4) : '0',
      lpDeposited: userPoolBalance ? userPoolBalance?.toSignificant(4) : '12'
    })
    fetchStats(
      account ? account : '',
      obj[address].LPToken,
      obj[address].contractAddress,
      obj[address].type,
      library?.provider
    ).then(res => setResult({ ...res, ...obj[address] }))
  }, [address, account, library])

  return (
    <AppBody>
      {account ? (
        <Container>
          <Wrapper style={{ paddingBottom: '25px' }}>
            <Icon name={''} pairName={obj[address].pairName} /> <span>{obj[address].pairName}</span>
          </Wrapper>
          <Wrapper style={{ paddingBottom: '10px' }}>
            <Item>
              <InfoPanel
                title={'Deposit APY'}
                data={(result.rewardsInfo[0].apyPercent * 100).toFixed(2)}
                icon={vector}
                apyIcon={apyPurple}
                label={'%'}
                txt={'#8E6CC0'}
                color={'#473660'}
              />{' '}
            </Item>
            <Item>
              <InfoDeposist token={address} pair={result.token0.symbol + '/' + result.token1.symbol} />
            </Item>
            <Item>
              <InfoPanel
                title={'Accruded Rewards'}
                data={formatUnits(result.rewardsInfo[0].accuruedRewards, 18)}
                apyIcon={apyGreen}
                label={' WFUSE'}
                icon={rewards}
                txt={'#1C9E7E'}
                color={'#0E4F3F'}
              />
            </Item>
          </Wrapper>
          <Wrapper style={{ paddingLeft: '4px', paddingRight: '10px' }}>
            <Reselect user={user} contract={result} />
          </Wrapper>
        </Container>
      ) : (
        'Loading'
      )}
    </AppBody>
  )
}
