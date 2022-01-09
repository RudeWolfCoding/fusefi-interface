import React, { useState } from 'react'
import styled from 'styled-components'
import { VOLT, xVOLT } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import fuseFiLogo from '../../assets/svg/fusefi_stake_icon.svg'
import fuseFiBoltLogo from '../../assets/svg/fusefi_bolt.svg'
import { TYPE } from '../../theme'
import { Card } from 'rebass/styled-components'
import Tab from './Tab'
import { useFactory, useOneDayBlock } from '../../graphql/hooks'
import { useXVoltTotalSupply } from '../../hooks/stake'
import { tryFormatAmount } from '../../utils'

const Wrapper = styled.div`
  margin: 4rem 1rem 2rem;
`

const AlignWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  flex-wrap: wrap;
  width: 840px;
  max-width: 100%;
  margin: 0 auto;
`

const LargeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 450px;
  max-width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    margin-bottom: 4rem;
  `}
`

const SmallColumn = styled.div`
  width: 350px;
  max-width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `}
`

const GradientBorder = styled.div<{ padding?: string; margin?: string; background?: string }>`
  position: relative;
  background: ${({ background }) => (background ? background : 'transparent')};
  ${({ padding }) => (padding ? `padding: ${padding};` : '')}
  ${({ margin }) => (margin ? `margin: ${margin};` : '')}
  border-radius: 10px;

  &:after {
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
    content: '';
    position: absolute;
    border-radius: 10px;
    width: 100%;
    top: 0;
    bottom: 0;
    left: -1px;
    padding: 1.5px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

const AprText = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 0 1rem;
  background: linear-gradient(96.84deg, #3ad889 -30.84%, #f3fc1f 119.45%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const FuseFiIcon = styled.img.attrs({
  src: fuseFiLogo,
  width: '250px'
})`
  display: block;
  margin: 0 auto;
`

const StakeCard = styled(Card)`
  padding: 20px;
  background: #242637;
  border-radius: 12px;
`

const AprCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StatsCard = styled(Card)`
  display: flex;
  justify-content: space-around;
  padding: 1.2rem;
  align-items: center;
`

const Stat = styled.div`
  position: relative;
`

const Dot = styled.div`
  background: linear-gradient(140.71deg, #f3fc1f 4.5%, #3ad889 105.5%);
  height: 6px;
  width: 6px;
  border-radius: 50%;
`

const Tabs = styled.div`
  display: flex;
  background-color: #b5b9d3;
  margin-bottom: 2rem;
  padding: 3px;
  border-radius: 11px;
  height: 48px;
`

const TabPane = styled.button<{ active?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 0;
  background: ${({ active }) => (active ? '#242637' : '#b5b9d3')};
  border-radius: 11px;
  text-align: center;
  color: ${({ active }) => (active ? 'white' : '#242637')};
  font-size: 16px;
  cursor: pointer;
`

export default function Stake() {
  const { account } = useActiveWeb3React()

  const voltBalance = useTokenBalance(account ?? undefined, VOLT)
  const xVoltBalance = useTokenBalance(account ?? undefined, xVOLT)

  const xVoltContractVoltBalance = useTokenBalance(xVOLT.address, VOLT)
  const xVoltTotalSupply = useXVoltTotalSupply()

  const voltPrice = 0.002
  const xVoltPrice = 0.002

  const formattedXVoltContractVoltBalance = tryFormatAmount(xVoltContractVoltBalance?.raw.toString(), VOLT.decimals)

  const formattedXVoltTotalSupply = tryFormatAmount(xVoltTotalSupply?.raw.toString(), 18)

  const block1d = useOneDayBlock()

  const exchange = useFactory()

  const exchange1d = useFactory(
    {
      blockNumber: block1d?.number
    },
    !!block1d
  )

  const tvl =
    !!formattedXVoltContractVoltBalance && !!voltPrice
      ? Number(formattedXVoltContractVoltBalance) * voltPrice
      : undefined

  const apr =
    !!formattedXVoltTotalSupply && !!xVoltPrice
      ? ((exchange?.totalVolumeUSD - exchange1d?.totalVolumeUSD * 0.0003 * 365) /
          (Number(formattedXVoltTotalSupply) * xVoltPrice)) *
          100 ?? 0
      : undefined

  const [isStake, setIsStake] = useState(true)

  const balance = isStake ? voltBalance : xVoltBalance

  return (
    <Wrapper>
      <AlignWrapper>
        <LargeColumn>
          <GradientBorder margin="0 0 1rem 0" background="#0B0C13">
            <StatsCard>
              <Stat>
                <TYPE.body fontSize={14} fontWeight={700} color="#B5B9D3">
                  TVL
                </TYPE.body>
                <TYPE.body color="#B5B9D3">${tvl?.toFixed(4)}</TYPE.body>
              </Stat>
              <Dot />
              <Stat>
                <TYPE.body fontSize={14} fontWeight={700} color="#B5B9D3">
                  Unstaked
                </TYPE.body>
                <TYPE.body color="#B5B9D3">{voltBalance?.toSignificant()} VOLT</TYPE.body>
              </Stat>
              <Dot />
              <Stat>
                <TYPE.body fontSize={14} fontWeight={700} color="#B5B9D3">
                  Balance
                </TYPE.body>
                <TYPE.body color="#B5B9D3">{xVoltBalance?.toSignificant()} xVOLT</TYPE.body>
              </Stat>
            </StatsCard>
          </GradientBorder>
          <GradientBorder
            margin="0 0 1rem 0"
            padding="1.2rem 0"
            background="linear-gradient(92.18deg, rgba(58, 216, 137, 0.25) -2.78%, rgba(243, 252, 31, 0.25) 102.81%);"
          >
            <AprCard>
              <img src={fuseFiBoltLogo} alt="bolt" />
              <AprText>Approximate APR {parseInt(String(apr))}%</AprText>
              <img src={fuseFiBoltLogo} alt="bolt" />
            </AprCard>
          </GradientBorder>
          <StakeCard>
            <Tabs>
              <TabPane active={isStake} onClick={() => setIsStake(true)}>
                Stake
              </TabPane>
              <TabPane active={!isStake} onClick={() => setIsStake(false)}>
                Unstake
              </TabPane>
            </Tabs>
            <Tab isStake={isStake} account={account ?? undefined} balance={balance} />
          </StakeCard>
        </LargeColumn>
        <SmallColumn>
          <GradientBorder padding="12px" background="#0B0C13">
            <TYPE.mediumHeader fontSize={16} marginBottom={16}>
              Stake VOLT
            </TYPE.mediumHeader>
            <TYPE.body fontSize={14} marginBottom={16}>
              Stake VOLT here and receive xVOLT as receipt representing your share of the pool. This pool automatically
              compounds by using a portion of all trade fees to buy back VOLT which means the xVOLT to VOLT ratio will
              grow over time!
            </TYPE.body>
            <TYPE.body fontSize={14} marginBottom={32}>
              Like liquidity providing (LP), you will earn fees according to your share in the pool, and your xVOLT
              receipt is needed as proof when claiming the rewards.
            </TYPE.body>
            <FuseFiIcon />
          </GradientBorder>
        </SmallColumn>
      </AlignWrapper>
    </Wrapper>
  )
}
