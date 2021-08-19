import ethers from 'ethers'
import { formatEther, parseUnits } from 'ethers/lib/utils'
import { getProviderOrSigner } from '..'
import BasicTokenABI from '../../constants/abis/tokenABI.json'
import { NETWORK_URL } from '../../connectors'
import { getProgram } from '../../utils/farm'

export async function withdrawInterest(contract: string, account: any, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.withdrawReward(account)
}

export async function withdrawLP(contract: string, account: any, amount: string, type: string, library: any) {
  const staking = getProgram(contract, library, type)
  return await staking.withdraw(amount, account)
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
  const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL)
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const transactionPromise = await basicTokenContract.balanceOf(account)
  return await formatEther(transactionPromise)
}

export async function getLPApproved(contractAddress: any, LP: any, account: any) {
  const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL)
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const transactionPromise = await basicTokenContract.allowance(account, contractAddress)
  return formatEther(transactionPromise)
}
