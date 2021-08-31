import { getProgram } from '../../utils/farm'

export async function withdrawInterest(contract: string, account: any, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.withdrawReward(account)
}

export async function withdrawLP(contract: string, account: any, amount: string, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.withdraw(amount, account)
}

export async function depositLP(contract: string, account: any, amount: any, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.deposit(amount, account)
}