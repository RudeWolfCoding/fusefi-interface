import React, { useCallback } from 'react'
import { Text } from 'rebass'
import { formatEther } from 'ethers/lib/utils'
import Row from '../Row'
import { ButtonGradient } from '../Button'
import VoltIcon from '../../assets/svg/volt.svg'
import { useVestingClaimableIds, useVestingTotalUnclaimedAmounts } from '../../state/vesting/hooks'
import { useVestingContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks'

export default function ClaimVestingTableRow({ vestingAddress }: any) {
  const { account } = useActiveWeb3React()
  const vestingContract = useVestingContract(vestingAddress, true)
  const userUnclaimedAmounts: any = useVestingTotalUnclaimedAmounts(vestingAddress, account ?? undefined)
  const claimableIds = useVestingClaimableIds(vestingAddress, account ?? undefined)

  const onClaim = useCallback(
    async (id: string) => {
      if (!vestingContract || !id) return
      try {
        await vestingContract.claimVestedTokens(id)
      } catch (error) {
        console.error(error)
      }
    },
    [vestingContract]
  )

  return (
    <Row
      padding={'11px 15px 11px 29px'}
      backgroundColor={'black'}
      justifyContent={'space-between'}
      borderRadius={'12px'}
      marginBottom={'5px'}
    >
      <Text> SWAP</Text>
      <Text display={'flex'} alignItems={'center'} marginLeft={'20px'}>
        <img src={VoltIcon} alt="" style={{ width: '25px', paddingBottom: '-8px', margin: 'auto' }} />
        {parseInt(formatEther(userUnclaimedAmounts))}
      </Text>
      {claimableIds?.map((userVestingId, index) => (
        <ButtonGradient
          key={userVestingId}
          width={'100px'}
          height={'32px'}
          padding={'0px'}
          onClick={() => onClaim(userVestingId)}
        >
          Claim Vesting {index}
        </ButtonGradient>
      ))}
    </Row>
  )
}
