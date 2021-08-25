import ethers from 'ethers'
import { formatEther, parseUnits } from 'ethers/lib/utils'
import { getProviderOrSigner } from '..'
import BasicTokenABI from '../../constants/abis/tokenABI.json'
import { getProgram } from '../../utils/farm'
import Staking from '../../constants/abis/stakeMethods.json'

export const provider = new ethers.providers.JsonRpcProvider('https://fuse-mainnet.gateway.pokt.network/v1/lb/6112cb7af7662000365d66ba')

export async function withdrawInterest(contract: string, account: any, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.withdrawReward(account)
}

export async function withdrawLP(contractAddress: any, LP: any, account: any, library: any, amount: string) {
  const stakingContractInstance = new ethers.Contract(contractAddress, Staking, getProviderOrSigner(library, account))
  console.log(library)
  const transactionPromise = await stakingContractInstance.withdrawStakeAndInterest(parseUnits(amount, 18))
  return transactionPromise
}


export async function depositLP(contract: string, account: any, amount: string, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.deposit(amount, account)
}

export async function approveLP(contractAddress: any, LP: any, account: any, library: any, amount: any) {
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, getProviderOrSigner(library, account))
  const transactionPromise = await basicTokenContract.approve(contractAddress, parseUnits(amount.toString(), 18))
  return transactionPromise
}

export async function getLPBalance(LP: any, account: any) {
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const transactionPromise = await basicTokenContract.balanceOf(account)
  return await formatEther(transactionPromise)
}

export async function getLPApproved(contractAddress: any, LP: any, account: any) {
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const transactionPromise = await basicTokenContract.allowance(account, contractAddress)
  return formatEther(transactionPromise)
}
