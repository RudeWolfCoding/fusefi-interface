import { ChainId } from '@fuseio/fuse-swap-sdk'
import { BINANCE_CHAIN_ID } from '../connectors'

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
  [ChainId.MAINNET]: {
    '0xb54536E0c4CA3FA54d394DB6B7c41f70AeC334FF': {
      networkId: 1,
      pairName: 'ETH/FUSE',
      LPToken: '0x4ce3687fed17e19324f23e305593ab13bbd55c4d',
      contractAddress: '0xb54536E0c4CA3FA54d394DB6B7c41f70AeC334FF',
      pairs: ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d'],
      rewards: ['0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d'],
      totalReward: 100000,
      type: 'multi'
    },
    '0xA4c9BEc5dbd6f3497301b01D62B9AA40c3E214F6': {
      networkId: 1,
      pairName: 'USDC/FUSE',
      LPToken: '0x611805Ce4071C096f5b44557b45685802d8a46FE',
      contractAddress: '0xA4c9BEc5dbd6f3497301b01D62B9AA40c3E214F6',
      pairs: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d'],
      rewards: ['0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d'],
      totalReward: 100000,
      type: 'multi'
    }
  },

  [ChainId.FUSE]: {
    '0x97e91465afEB9866a3882b7Ced41cE0F6b533abe': {
      networkId: 122,
      pairName: 'WETH/USDC',
      LPToken: '0x20a680D69a5aE2677B8CF43aBF63aAD6D8d5119A',
      contractAddress: '0x97e91465afEB9866a3882b7Ced41cE0F6b533abe',
      pairs: ['0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670', '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5'],
      rewards: [],
      type: 'single'
    },
    '0x3e1DE36098965f09836028354e13Ad945dDB84f0': {
      networkId: 122,
      pairName: 'WBTC/WETH',
      LPToken: '0x067A7db4B5a4291B79D999b8104021653be4611f',
      contractAddress: '0x3e1DE36098965f09836028354e13Ad945dDB84f0',
      pairs: ['0x33284f95ccb7B948d9D352e1439561CF83d8d00d', '0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670'],
      rewards: [],
      type: 'single'
    },
    '0x4957d310D6704DbdAb18F7D651F655aa59C6059a': {
      networkId: 122,
      pairName: 'USDC/USDT',
      LPToken: '0x55251a974ad10ed5BB5d48688EB544c29c99800A',
      contractAddress: '0x4957d310D6704DbdAb18F7D651F655aa59C6059a',
      pairs: ['0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5', '0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10'],
      rewards: [],
      type: 'single'
    },
    '0x49aE27DCB1A7621073e6Cb23Ce4A16423993DD95': {
      networkId: 122,
      pairName: 'DAI/USDT',
      LPToken: '0x38EBDa3998815dAD9c01Eb0Becfb937F4C3E5461',
      contractAddress: '0x49aE27DCB1A7621073e6Cb23Ce4A16423993DD95',
      pairs: ['0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA', '0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10'],
      rewards: [],
      type: 'single'
    },
    '0x4EE7127d43B385C77308bdF9E9d59258ab11e836': {
      networkId: 122,
      pairName: 'KNC/USDC',
      contractAddress: '0x4EE7127d43B385C77308bdF9E9d59258ab11e836',
      LPToken: '0xb5FCFfc23771500A097E47e94D92b7691536ad82',
      pairs: ['0x43b17749b246fd2a96de25d9e4184e27e09765b0', '0x620fd5fa44be6af63715ef4e65ddfa0387ad13f5'],
      totalReward: 50000,
      rewards: [],
      type: 'single'
    },
    '0x835b51352f906ff7632A38F20137218309895506': {
      networkId: 122,
      pairName: 'OM/USDC',
      contractAddress: '0x835b51352f906ff7632A38F20137218309895506',
      LPToken: '0x8c7538099a4f5e21752CAd6632f35161800e85C9',
      pairs: ['0x7f59ae3a787c0d1d640f99883d0e48c22188c54f', '0x620fd5fa44be6af63715ef4e65ddfa0387ad13f5'],
      totalReward: 35000,
      rewards: [],
      type: 'single'
    },
    '0x9091D40Ed50842BE9BDEDA5fEF6CfF82485De741': {
      networkId: 122,
      pairName: 'LINK/WETH',
      contractAddress: '0x9091D40Ed50842BE9BDEDA5fEF6CfF82485De741',
      LPToken: '0x43BEB6dE261279ca9910Bb45956d083CB9c8101e',
      pairs: ['0x0972F26e8943679b043de23df2fD3852177A7c48', '0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670'],
      totalReward: 25000,
      rewards: [],
      type: 'single'
    },
    '0x1795AC4015CA9E818371Ed22f1bf913f596d204F': {
      networkId: 122,
      pairName: 'GRT/WETH',
      contractAddress: '0x1795AC4015CA9E818371Ed22f1bf913f596d204F',
      LPToken: '0x752ef07fBe94398b93Fcbf25ffc3B222602CBA85',
      pairs: ['0x025a4c577198D116Ea499193E6D735FDb2e6E841', '0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670'],
      totalReward: 25000,
      rewards: [],
      type: 'single'
    },
    '0x471C46C37958EB26FE4EB57D3FBd387172cB7434': {
      networkId: 122,
      pairName: 'KNC/USDC',
      contractAddress: '0x471C46C37958EB26FE4EB57D3FBd387172cB7434',
      LPToken: '0xb5FCFfc23771500A097E47e94D92b7691536ad82',
      pairs: ['0x43b17749b246fd2a96de25d9e4184e27e09765b0', '0x620fd5fa44be6af63715ef4e65ddfa0387ad13f5'],
      totalReward: 25000,
      rewards: [],
      type: 'single'
    },
    '0x57095EcA8B76f26DB5E95A00EEbdaeEdC62a5ee9': {
      networkId: 122,
      pairName: 'USDC/FUSE',
      LPToken: '0x9f17b1895633E855b8b1C1D0Ade9B3B72EB0590C',
      contractAddress: '0x57095EcA8B76f26DB5E95A00EEbdaeEdC62a5ee9',
      pairs: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629', '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5'],
      totalReward: 150000,
      rewards: [],
      type: 'single'
    },
    '0x4Bd7dc50B49d018FDE10a1ae6b29f09E175b85fC': {
      networkId: 122,
      pairName: 'fUSD/FUSE',
      contractAddress: '0x4Bd7dc50B49d018FDE10a1ae6b29f09E175b85fC',
      LPToken: '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
      pairs: ['0x249be57637d8b013ad64785404b24aebae9b098b', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      totalReward: 100000,
      rewards: [],
      type: 'single'
    },
    '0xAAb4FB30aD9c20EFFDA712c0fFC24f77b1B5439d': {
      networkId: 122,
      pairName: 'WETH/FUSE',
      contractAddress: '0xAAb4FB30aD9c20EFFDA712c0fFC24f77b1B5439d',
      LPToken: '0x75e24462108E49B71278c93b49B35A5837c0547C',
      pairs: ['0xa722c13135930332Eb3d749B2F0906559D2C5b99', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      totalReward: 150000,
      rewards: [],
      type: 'single'
    },
    '0xf14D745a4D264255F758B541BB1F61EbC589EA25': {
      networkId: 122,
      pairName: 'fUSD/FUSE',
      contractAddress: '0xf14D745a4D264255F758B541BB1F61EbC589EA25',
      LPToken: '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
      pairs: ['0x249be57637d8b013ad64785404b24aebae9b098b', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      totalReward: 150000,
      rewards: [],
      type: 'single'
    },
    '0x04Ee5DE43332aF99eeC2D40de19962AA1cC583EC': {
      networkId: 122,
      pairName: 'G$/USDC',
      contractAddress: '0x04Ee5DE43332aF99eeC2D40de19962AA1cC583EC',
      LPToken: '0x0bf36731724f0bAcEb0748A9E71CD4883B69c533',
      pairs: ['0x495d133B938596C9984d462F007B676bDc57eCEC', '0x620fd5fa44be6af63715ef4e65ddfa0387ad13f5'],
      totalReward: 75000,
      rewards: [],
      type: 'single'
    },
    '0x65995B106988E9aCd15998a5DF95aDe89b6511c8': {
      networkId: 122,
      pairName: 'fUSD/BNB',
      contractAddress: '0x65995B106988E9aCd15998a5DF95aDe89b6511c8',
      LPToken: '0x123e18262642a090b209A9CdD5bC5DFA03d734D1',
      pairs: ['0x249BE57637D8B013Ad64785404b24aeBaE9B098B', '0x6acb34b1Df86E254b544189Ec32Cf737e2482058'],
      rewards: [],
      type: 'single'
    },
    '0xC68eAa3c93cA8BB829243EA2cdA215c944500b2a': {
      networkId: 122,
      pairName: 'DEXT/FUSE',
      contractAddress: '0xC68eAa3c93cA8BB829243EA2cdA215c944500b2a',
      LPToken: '0xCD0643b3B2481ee9280eADbE8b54104bfDee9bdB',
      pairs: ['0x92c9DD8F3C443d75949A1B46F2878cacc1089de5', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: [],
      type: 'single'
    },
    '0xFF1F9fd96BA115376042c8893B438D03eedd5503': {
      networkId: 122,
      pairName: 'fUSD/FUSE',
      contractAddress: '0xFF1F9fd96BA115376042c8893B438D03eedd5503',
      LPToken: '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
      pairs: ['0x249be57637d8b013ad64785404b24aebae9b098b', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: [],
      type: 'single'
    },
    '0x66B393872d11468A3266E6a6a85328Bc5A6C51bD': {
      networkId: 122,
      pairName: 'WETH/FUSE',
      contractAddress: '0x66B393872d11468A3266E6a6a85328Bc5A6C51bD',
      LPToken: '0x75e24462108E49B71278c93b49B35A5837c0547C',
      pairs: ['0xa722c13135930332Eb3d749B2F0906559D2C5b99', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: [],
      type: 'single'
    },
    '0xF449846eCe9c8d9438e1E940840EE59314AF4502': {
      networkId: 122,
      pairName: 'WBTC/WETH',
      LPToken: '0x79fb917292f841ab64941c04acdf5f9059aa24e7',
      contractAddress: '0xF449846eCe9c8d9438e1E940840EE59314AF4502',
      pairs: ['0x33284f95ccb7B948d9D352e1439561CF83d8d00d', '0xa722c13135930332Eb3d749B2F0906559D2C5b99'],
      rewards: [],
      type: 'single'
    },
    '0x45609C92B46F8f9d101D421f155eD558a043AF99': {
      networkId: 122,
      pairName: 'WBTC/WETH',
      LPToken: '0x79fb917292f841ab64941c04acdf5f9059aa24e7',
      contractAddress: '0x45609C92B46F8f9d101D421f155eD558a043AF99',
      pairs: ['0x33284f95ccb7B948d9D352e1439561CF83d8d00d', '0xa722c13135930332Eb3d749B2F0906559D2C5b99'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 100000,
      type: 'multi'
    },
    '0xbCa51ae3896f4033fb7B467BD3ab4A4ff27f3a3E': {
      networkId: 122,
      pairName: 'WETH/FUSE',
      contractAddress: '0xbCa51ae3896f4033fb7B467BD3ab4A4ff27f3a3E',
      LPToken: '0x75e24462108E49B71278c93b49B35A5837c0547C',
      pairs: ['0xa722c13135930332Eb3d749B2F0906559D2C5b99', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 100000,
      type: 'multi'
    },
    '0x076BDeA1fD4695BDEF9Ba4579463BC4B3C97d645': {
      networkId: 122,
      pairName: 'fUSD/FUSE',
      contractAddress: '0x076BDeA1fD4695BDEF9Ba4579463BC4B3C97d645',
      LPToken: '0xcDd8964BA8963929867CAfFCf5942De4F085bFB7',
      pairs: ['0x249be57637d8b013ad64785404b24aebae9b098b', '0x0be9e53fd7edac9f859882afdda116645287c629'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 100000,
      type: 'multi'
    },
    '0x1E3C4727A7dAFDd51Dc202232D2eB696E734f1Cb': {
      networkId: 122,
      pairName: 'fUSD/BNB',
      contractAddress: '0x1E3C4727A7dAFDd51Dc202232D2eB696E734f1Cb',
      LPToken: '0x123e18262642a090b209A9CdD5bC5DFA03d734D1',
      pairs: ['0x249BE57637D8B013Ad64785404b24aeBaE9B098B', '0x6acb34b1Df86E254b544189Ec32Cf737e2482058'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 70000,
      type: 'multi'
    },
    '0x39ce2B1f8e73Ae1FE4eb3aeCC0D68B8855bb24F7': {
      networkId: 122,
      pairName: 'FUSE/BUSD',
      contractAddress: '0x39ce2B1f8e73Ae1FE4eb3aeCC0D68B8855bb24F7',
      LPToken: '0x2e7DeDEfC1b40eb2C935A5d07ACDb8F8a9B2A91D',
      pairs: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629', '0x6a5f6a8121592becd6747a38d67451b310f7f156'],
      rewards: ['0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'],
      totalReward: 150000,
      type: 'multi'
    },
    '0x38D4e6Df715b968B49579F64eCA15B12FB972884': {
      networkId: 122,
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
      networkId: 56,
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
