export interface Rewards {
  rewards: Reward[]
}

export interface Reward {
  contractAddress: string
  LPToken: string
  globalTotalStake: string
  totalRewards: string
  estimatedRewards: string
  unlockedRewards: string
  accuruedRewards: string
  totalStakedUSD: number
  globalTotalStakeUSD: number
  pairPrice: number
  reserve0: string
  reserve1: string
  lockedRewards: string
  isActive: boolean
  type: string
  rewardsInfo: Info[]
  token0: Token
  token1: Token
}

export interface Info {
  totalRewards: number
  rewardRate: number
  totalRewardsInUSD: number
  apyPercent: number
  accuruedRewards: number
}

export interface Token {
  __typename: string
  id: string
  name: string
  symbol: string
}

export interface User {
  account: string
  lpAvailable: string
  lpApproved: string
  lpDeposited: string
  rewardAcruded: string
  rewardUnlockedUser: string
  rewardEstimate: string
  rewardTotal: string
  rewardUnlocked: string
}

export const RewardObj = {
  contractAddress: '',
  LPToken: '',
  type: '',
  globalTotalStake: '',
  totalRewards: '',
  estimatedRewards: '',
  unlockedRewards: '',
  accuruedRewards: '',
  rewardsInfo: [
    {
      accuruedRewards: 0,
      totalRewards: 0,
      rewardRate: 0,
      totalRewardsInUSD: 0,
      apyPercent: 0
    }
  ],
  token0: {
    __typename: '',
    id: '',
    name: '',
    symbol: ''
  },
  token1: {
    __typename: '',
    id: '',
    name: '',
    symbol: ''
  },
  totalStakedUSD: 0,
  globalTotalStakeUSD: 0,
  pairPrice: 0,
  reserve0: '',
  reserve1: '',
  lockedRewards: '',
  isActive: false
}

export const UserObj = {
  account: '',
  lpDeposited: '0',
  lpApproved: '0',
  rewardTotal: '0',
  lpAvailable: '0',
  rewardAcruded: '0',
  rewardEstimate: '0',
  rewardUnlocked: '0',
  rewardUnlockedUser: '0'
}
