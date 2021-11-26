import { JSBI, TokenAmount } from '@fuseio/fuse-swap-sdk'
import { useEffect, useState } from 'react'
import { MERKLE_DISTRIBUTOR_INFO_URL, VOLT } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import { calculateGasMargin, isAddress } from '../../utils'
import { useSingleCallResult } from '../multicall/hooks'
import { useTransactionAdder } from '../transactions/hooks'

interface UserClaimData {
  index: number
  amount: string
  proof: string[]
}

interface MerkleDistributorInfo {
  claims: {
    [account: string]: UserClaimData
  }
}

async function fetchClaim(account: string): Promise<UserClaimData | null> {
  try {
    const formattedAccount = isAddress(account)
    if (!formattedAccount) return null

    const response = await fetch(MERKLE_DISTRIBUTOR_INFO_URL)
    const merkleInfo: MerkleDistributorInfo = await response.json()

    if (!merkleInfo.claims[formattedAccount]) {
      console.log(`No claim for account ${formattedAccount}`)
      return null
    }

    return merkleInfo.claims[formattedAccount]
  } catch (error) {
    console.error('Failed to get claim data', error)
    return null
  }
}

export function useUserClaimData(account: string | null | undefined): UserClaimData | null | undefined {
  const [claimInfo, setClaimInfo] = useState<{ [key: string]: UserClaimData }>({})

  useEffect(() => {
    if (!account) return

    fetchClaim(account).then(accountClaimInfo => {
      if (accountClaimInfo) {
        setClaimInfo(claimInfo => {
          return {
            ...claimInfo,
            [account]: accountClaimInfo
          }
        })
      }
    })
  }, [account])

  return account ? claimInfo[account] : undefined
}

export function useUserHasAvailableClaim(account: string | null | undefined): boolean {
  const userClaimData = useUserClaimData(account)
  const distributorContract = useMerkleDistributorContract()
  const isClaimedResult = useSingleCallResult(distributorContract, 'isClaimed', [userClaimData?.index])

  return Boolean(userClaimData && !isClaimedResult.loading && isClaimedResult.result?.[0] === false)
}

export function useUserUnclaimedAmount(account: string | null | undefined): TokenAmount | undefined {
  const userClaimData = useUserClaimData(account)
  const canClaim = useUserHasAvailableClaim(account)

  return !canClaim || !userClaimData
    ? new TokenAmount(VOLT, JSBI.BigInt(0))
    : new TokenAmount(VOLT, JSBI.BigInt(userClaimData.amount))
}

export function useClaimCallback(account: string | null | undefined): () => Promise<string> {
  const { library } = useActiveWeb3React()
  const claimData = useUserClaimData(account)

  const unClaimedAmount = useUserUnclaimedAmount(account)
  const addTransaction = useTransactionAdder()
  const distributionContract = useMerkleDistributorContract()

  const claimCallback = async function() {
    if (!claimData || !account || !library || !distributionContract) return

    const args = [claimData.index, account, claimData.amount, claimData.proof]

    const estimatedGasLimit = await distributionContract.estimateGas['claim'](...args, {})
    const response = await distributionContract.claim(...args, {
      value: null,
      gasLimit: calculateGasMargin(estimatedGasLimit)
    })

    addTransaction(response, {
      summary: `Claimed ${unClaimedAmount?.toSignificant(4)} VOLT`
    })

    return response.hash
  }

  return claimCallback
}
