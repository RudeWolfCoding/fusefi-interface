import React from 'react'
import AppBody from '../AppBody'
import StakingABI from '../../constants/abis/staking.json'
import Config from '../../constants/abis/config.json'
import get from 'lodash/get'
import styled from 'styled-components'
import axios from "axios";
import { formatWeiToNumber } from '../../components/Rewards/utils'
import Table from '../../components/Rewards';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";


export const getTokenPrice = (tokenAddress: string, vsCurrencies = 'usd') => {

  const  fetchData = () => {
    axios({
      "method": "GET",
      "url": "https://service.fuseswap.com/api/v1/price/0x0be9e53fd7edac9f859882afdda116645287c629",
    })
    .then((response) => {
      return response
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    })
  }

return fetchData;
}

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    overflow: hidden;
`
// replace Config[0]
const fuseswapClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri:`${Config[0].api.graph.fuseswap.url}${Config[0].api.graph.fuseswap.subgraphs.fuseswap}`})
})

const uniswapClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri:`${Config[0].api.graph.fuseswap.url}${Config[0].api.graph.fuseswap.subgraphs.fuseswap}`})
})

export const fetchPairInfoUniswap = (address:Node) => uniswapClient.query({
  query: GET_PAIR_INFO(address)
})

export const fetchPairInfoFuseswap = (address: string) => fuseswapClient.query({
  query: GET_PAIR_INFO(address)
})



const GET_PAIR_INFO = (address:any) => {
  return gql`
    {
      pair(id: "${address.toLowerCase()}") {
        untrackedVolumeUSD
        reserveETH
        reserveUSD
        token0Price
        token1Price
        volumeUSD
        liquidityProviderCount
        reserve0
        reserve1
        trackedReserveETH
        totalSupply
        token0 {
          id
          name
          symbol
        }
        token1 {
          id
          name
          symbol
        }
      }
    }
  `
}

async function pairInfoFetcher (networkId: string, address: any) {
  let method

  switch (networkId) {
    case '1':
      method = fetchPairInfoUniswap 
      break
    case '122':
      method = fetchPairInfoFuseswap
      break
    default:
      throw new Error('pairInfoFetcher unsupported networkId: ' + networkId)
  }
  return method;
}
  
  export async function getApyPercent (stakingContractAddress: any, tokenAddress: any, networkId: any, web3: { eth: { Contract: new (arg0: any, arg1: any) => any } }, account: any) {
    // fetch pairInfo from subgraph, changeFrequency: Low
    const data = await pairInfoFetcher(networkId, tokenAddress) // subsitute with equivalent in fuseswap
  
    // fetch stats data from contract, changeFrequency: High
    const stakingContractInstance = new web3.eth.Contract(StakingABI, stakingContractAddress)
    const statsData = await stakingContractInstance.methods.getStatsData(account).call()
    
    const totalReward = statsData[1]
    const globalTotalStake = statsData[0]
    
    const totalRewardInUSD = formatWeiToNumber(totalReward) * 0.23
    const reserveUSD = get(data, 'pair.reserveUSD', 0)
    const totalSupply = get(data, 'pair.totalSupply', 0)
    const lpPrice = reserveUSD / totalSupply
    const globalTotalStakeUSD = formatWeiToNumber(globalTotalStake) * lpPrice
  
    // fetch stakingPeriod from contract, changeFrequency: Low
    const stakingPeriod = await stakingContractInstance.methods.stakingPeriod().call()
    const stakingPeriodInDays = Number(stakingPeriod) / (3600 * 24)
  
    return (totalRewardInUSD / globalTotalStakeUSD) * (365 / stakingPeriodInDays) * 100
  }

export default function Farm() {
  Object.keys(Config[0].contracts.fuse).forEach(async key =>{
    const data:any = await pairInfoFetcher('122', key).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);

    });
    console.log(data);
  })

  return (
      <AppBody>
        <Wrapper>
          <Table />
        </Wrapper>
      </AppBody>

  )
}

