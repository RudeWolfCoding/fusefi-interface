import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { calculateAPY, getContract, getFarmingPools } from '../../utils/farm'
import Apy from '../../components/Rewards/apy'
import vector from '../../assets/svg/vector.svg'
import deposits from '../../assets/svg/deposits.svg'
import rewards from '../../assets/svg/rewardsAcc.svg'
import Icon from '../../components/Rewards/icons'
import apyPurple from '../../assets/svg/questionmark.svg'
import apyBlue from '../../assets/svg/questionmark2.svg'
import apyGreen from '../../assets/svg/questionmark3.svg'
import Reselect from '../../components/Rewards/reselect'
import { getRewardsData } from '../../utils/rewards'
import { useActiveWeb3React } from '../../hooks'

const Wrapper = styled('div')`
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

const Grid = styled('div')`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
`
const ItemWrapper = styled('div')`
  margin: 4px;
`

const Item = styled('div')`
  width: 33.333333333333336%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`
const Title = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  > span {
    line-height: 54px;
    font-size: 32px;
    font-weight: 500;
  }
`

export default function FarmReselect(props: RouteComponentProps<{ currencyIdA: string }>) {
  const {
    match: {
      params: { currencyIdA }
    }
  } = props
  const [result, setResult] = useState<any>({
    res: [],
    lpTotal: '0',
    rewardsTotal: '0',
    lpUser: '0',
    lpBalance: '0',
    rewardAcruded: '0',
    rewardsUnlocked: '0'
  })
  const [allContracts] = useState([...getFarmingPools()])
  const [contract, setContract] = useState<{
    address: string
    contractAddress: string
    token0: string
    token1: string
    pairs: [string]
    apy: string
    duration: number
    start: Date
    end: Date
    rewards: number
    token0Pool: number
    token1Pool: number
  }>({
    address: '',
    contractAddress: '',
    token0: '',
    token1: '',
    pairs: [''],
    apy: '',
    duration: 0,
    start: new Date(),
    end: new Date(),
    rewards: 0,
    token0Pool: 0,
    token1Pool: 0
  })
  const [apy, setApy] = useState({ apy: 0 })
  const { account } = useActiveWeb3React()

  useEffect(() => {
    allContracts.forEach((contractData: { contractAddress: string }, index: any) => {
      if (contractData.contractAddress === currencyIdA) {
        setContract(allContracts[index])
      }
    })

    const getUserRewardData = async () => {
      return await getRewardsData(contract.contractAddress, contract.address, account).then(res => {
        return res
      })
    }

    const fetchData = async () => {
      return await getContract(contract)
    }

    const getData = async (response: any, contract: any) => {
      return await calculateAPY(response, contract)
    }

    fetchData().then(res => getData(res, contract).then(res => setApy(res)))
    getUserRewardData().then(res => {
      setResult(res)
    })
  }, [allContracts, currencyIdA, contract, account])

  return (
    <AppBody>
      <Wrapper>
        <Title>
          <Icon name={''} contract={contract.contractAddress} />{' '}
          <span>
            {contract.token0} - {contract.token1}
          </span>
        </Title>

        <Grid>
          <Item>
            <ItemWrapper>
              <Apy
                title={'Deposit APY'}
                data={apy.apy + '%'}
                icon={vector}
                apyIcon={apyPurple}
                txt={'#8E6CC0'}
                color={'#473660'}
              />{' '}
            </ItemWrapper>
          </Item>
          <Item>
            <ItemWrapper>
              <Apy
                title={'Your Deposits'}
                data={result.lpBalance}
                apyIcon={apyBlue}
                label={contract.token0 + ' - ' + contract.token1}
                icon={deposits}
                txt={'#0684A6'}
                color={'#034253'}
              />
            </ItemWrapper>
          </Item>
          <Item>
            <ItemWrapper>
              <Apy
                title={'Accruded Rewards'}
                data={result.rewardAcruded}
                apyIcon={apyGreen}
                label={'WFUSE'}
                icon={rewards}
                txt={'#1C9E7E'}
                color={'#0E4F3F'}
              />
            </ItemWrapper>
          </Item>
        </Grid>
        <Grid>
          <ItemWrapper>
            <Reselect
              result={result}
              contract={{
                stakingContractAddress: contract.contractAddress,
                tokenAddress: contract.address,
                user: account || '',
                token0: contract.token0,
                token1: contract.token1
              }}
            ></Reselect>
          </ItemWrapper>
        </Grid>
      </Wrapper>
    </AppBody>
  )
}
