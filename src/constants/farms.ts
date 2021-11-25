import { ETHEREUM_CHAIN_ID, BINANCE_CHAIN_ID, FUSE_CHAIN_ID } from '../connectors'

export interface Farm {
  contractAddress: string
  LPToken: string
  type: string
  networkId: number
  pairName: string
  pairs: Array<string>
  rewards: Array<string>
  totalReward?: number
  reserve0?: string
  reserve1?: string
  token0?: {
    symbol: string
  }
  token1?: {
    symbol: string
  }
  rewardsInfo?: Array<any>
  totalStaked?: string
  globalTotalStake?: string
  start?: number
  duration?: number
  end?: number
  isExpired?: boolean
  rewardsPerDay?: number
  rewardsUSDPerDay?: number
}

export const FARM_CONTRACTS: {
  [key: number]: {
    [key: string]: Farm
  }
} = {
  [ETHEREUM_CHAIN_ID]: {
    '0xb54536E0c4CA3FA54d394DB6B7c41f70AeC334FF': {
      networkId: ETHEREUM_CHAIN_ID,
      pairName: 'ETH/FUSE',
      LPToken: '0x4ce3687fed17e19324f23e305593ab13bbd55c4d',
      contractAddress: '0xb54536E0c4CA3FA54d394DB6B7c41f70AeC334FF',
      pairs: ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d'],
      rewards: ['0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d'],
      totalReward: 100000,
      type: 'multi'
    }
  },

  [FUSE_CHAIN_ID]: {
    '0x45609C92B46F8f9d101D421f155eD558a043AF99': {
      networkId: FUSE_CHAIN_ID,
      pairName: 'WBTC/WETH',
      LPToken: '0x79fb917292f841ab64941c04acdf5f9059aa24e7',
      contractAddress: '0x45609C92B46F8f9d101D421f155eD558a043AF99',
      pairs: ['0x33284f95ccb7B948d9D352e1439561CF83d8d00d', '0xa722c13135930332Eb3d749B2F0906559D2C5b99'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 100000,
      type: 'multi'
    },
    '0xbCa51ae3896f4033fb7B467BD3ab4A4ff27f3a3E': {
      networkId: FUSE_CHAIN_ID,
      pairName: 'WETH/FUSE',
      contractAddress: '0xbCa51ae3896f4033fb7B467BD3ab4A4ff27f3a3E',
      LPToken: '0x75e24462108E49B71278c93b49B35A5837c0547C',
      pairs: ['0xa722c13135930332Eb3d749B2F0906559D2C5b99', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 100000,
      type: 'multi'
    },
    '0x076BDeA1fD4695BDEF9Ba4579463BC4B3C97d645': {
      networkId: FUSE_CHAIN_ID,
      pairName: 'fUSD/FUSE',
      contractAddress: '0x076BDeA1fD4695BDEF9Ba4579463BC4B3C97d645',
      LPToken: '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
      pairs: ['0x249be57637d8b013ad64785404b24aebae9b098b', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 100000,
      type: 'multi'
    },
    '0x1E3C4727A7dAFDd51Dc202232D2eB696E734f1Cb': {
      networkId: FUSE_CHAIN_ID,
      pairName: 'fUSD/BNB',
      contractAddress: '0x1E3C4727A7dAFDd51Dc202232D2eB696E734f1Cb',
      LPToken: '0x123e18262642a090b209A9CdD5bC5DFA03d734D1',
      pairs: ['0x249BE57637D8B013Ad64785404b24aeBaE9B098B', '0x6acb34b1Df86E254b544189Ec32Cf737e2482058'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 70000,
      type: 'multi'
    },
    '0x39ce2B1f8e73Ae1FE4eb3aeCC0D68B8855bb24F7': {
      networkId: FUSE_CHAIN_ID,
      pairName: 'FUSE/BUSD',
      contractAddress: '0x39ce2B1f8e73Ae1FE4eb3aeCC0D68B8855bb24F7',
      LPToken: '0x2e7DeDEfC1b40eb2C935A5d07ACDb8F8a9B2A91D',
      pairs: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629', '0x6a5f6a8121592becd6747a38d67451b310f7f156'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 150000,
      type: 'multi'
    },
    '0x38D4e6Df715b968B49579F64eCA15B12FB972884': {
      networkId: FUSE_CHAIN_ID,
      pairName: 'FUSE/USDC',
      contractAddress: '0x38D4e6Df715b968B49579F64eCA15B12FB972884',
      LPToken: '0x9f17b1895633E855b8b1C1D0Ade9B3B72EB0590C',
      pairs: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629', '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 150000,
      type: 'multi'
    }
  },

  [BINANCE_CHAIN_ID]: {
    '0x4f18D7FA5996337ba787f82C4D4758A6e655D6B3': {
      networkId: BINANCE_CHAIN_ID,
      pairName: 'FUSE/BNB',
      contractAddress: '0x4f18D7FA5996337ba787f82C4D4758A6e655D6B3',
      LPToken: '0x6483F166b9E4310A165a55FEa04F867499aded06',
      pairs: ['0x5857c96DaE9cF8511B08Cb07f85753C472D36Ea3', '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'],
      rewards: ['0x5857c96dae9cf8511b08cb07f85753c472d36ea3'],
      totalReward: 75000,
      type: 'multi'
    }
  }
}

export const FARM_REWARD_TOKENS = {
  rewardTokens: {
    '1': '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d',
    '56': '0x5857c96dae9cf8511b08cb07f85753c472d36ea3',
    '122': '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'
  }
}
