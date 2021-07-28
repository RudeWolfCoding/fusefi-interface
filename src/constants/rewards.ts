export interface Reward {
  result: string
  withdrawValue?: number
  approvedValue?: number
  depositedValue?: number
  lpAvailable: string
  lpApproved: string
  lpBalance: string
  rewardAcruded: string
  rewardUnlockedUser: string
  rewardEstimate: string
  rewardTotal: string
  rewardUnlocked: string
  data: Data
  contract: Contract
}
export interface Data {
  lpAvailable: string
  lpApproved: string
  lpBalance: string
  rewardUnlockedUser: string
  rewardEstimate: string
  rewardTotal: string
  rewardUnlocked: string
  rewardAcruded: string
}

export interface Contract {
  stakingContractAddress: string
  tokenAddress: string
  user: string
  token0: string
  token1: string
}

export interface ClaimProps {
  withdrawValue?: number
  rewardAccruded: string
  data: {
    lpBalance: string
    rewardUnlocked: string
    rewardAcruded: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
  }
  contract: {
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }
}
