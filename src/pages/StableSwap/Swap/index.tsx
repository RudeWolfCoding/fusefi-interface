import React, { useMemo, useState } from 'react'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'
import MainCard from '../../../components/MainCard'
import { SwapPoolTabs } from '../../../components/NavigationTabs'
import Maintenance from '../../../components/swap/Maintenance'
import { AppWrapper, AppWrapperInner, ArrowWrapper } from '../../../components/swap/styleds'
import SwitchNetwork from '../../../components/swap/SwitchNetwork'
import { UNDER_MAINTENANCE, STABLESWAP_POOLS } from '../../../constants'
import { useActiveWeb3React, useChain } from '../../../hooks'
import AppBody from '../../AppBody'
import Dropdown from 'react-dropdown'
import { ArrowDown } from 'react-feather'
import 'react-dropdown/style.css'
import { Token } from '@fuseio/fuse-swap-sdk'
import { FUSE_USDT } from '../../../constants'
import useStableSwapCallback from '../../../hooks/useStableSwapCallback'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { tryFormatAmount } from '../../../utils'
// import { inputOutputComparator } from '@fuseio/fuse-swap-sdk'
// import {Input as NumericalInput} from "../../../components/NumericalInput"

// function StableSwapBody() {
//   return <NumericalInput
// }

export default function StableSwap() {
  const { isHome } = useChain()
  const [typedAmount, setTypedAmount] = useState<string>('0.0')
  const [inputCurrency, setInputCurrency] = useState<Token | undefined>(FUSE_USDT)
  const [outputCurrency, setOutputCurrency] = useState<Token | undefined>(undefined)

  const resetSelectedCurrencies = () => {
    setInputCurrency(FUSE_USDT)
    setOutputCurrency(undefined)
  }

  const poolOptions = useMemo(() => {
    let options = []
    for (let element in STABLESWAP_POOLS) {
      let pool = STABLESWAP_POOLS[element]
      options.push({
        value: pool.address,
        label: `${pool.name}: ${pool.tokenList.map((token) => token.symbol).join(', ')}`,
      })
    }
    console.log(options)
    return options
  }, [])
  const [poolAddress, setPoolAddress] = useState<string>(poolOptions[0].value)
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  console.log(approvalSubmitted)
  const {exactOutput, execute} = useStableSwapCallback(poolAddress, inputCurrency, outputCurrency, typedAmount)
  console.log(execute)
  const out = tryFormatAmount(Number(exactOutput ?? '0').toString(), outputCurrency?.decimals)

  // const [estimatedOut, setEstimatedOut] = useState<string>(exactOutput?.toExact())

  

  const {account} = useActiveWeb3React()
  const inputBalance = useCurrencyBalance(account ?? undefined, inputCurrency)

  const onInputAmountChanged = (value: any) => {
    setTypedAmount(value)
  }

  const onPoolSelected = (selection: any) => {
    setPoolAddress(selection.value)
    localStorage.setItem("stablePoolAddress", selection.value) // TODO: figure out redux and use it instead of localStorage
    resetSelectedCurrencies()
  }

  const handleInputSelect = (
    (input: any) => {
      console.log(input)
      setApprovalSubmitted(false)
      setInputCurrency(input)
    }
  )


  const handleOutputSelect = (
    (output: any) => {
      console.log(output)
      setOutputCurrency(output)
    }
  )

  const onMax = () => {
    if(!inputBalance) return
    setTypedAmount(inputBalance.toExact())
  }

  if (UNDER_MAINTENANCE) {
    return <Maintenance />
  }

  if (!isHome) {
    return (
      <>
        <AppBody>
          <AppWrapper>
            <AppWrapperInner>
              <SwapPoolTabs active={'stable-swap'} />
              <MainCard>
                <SwitchNetwork />
              </MainCard>
            </AppWrapperInner>
          </AppWrapper>
        </AppBody>
      </>
    )
  }

  return (
    <AppBody>
      <AppWrapper>
        <AppWrapperInner>
          <SwapPoolTabs active={'stable-swap'} />
          <MainCard>
            <label>Select a Stable Swap pool: </label>
            <Dropdown
              options={poolOptions}
              onChange={onPoolSelected}
              value={poolAddress}
              placeholder="Select a StableSwap pool"
            ></Dropdown>
            <CurrencyInputPanel
              id="stable-swap-currency-input"
              label="From: "
              onUserInput={onInputAmountChanged}
              showMaxButton={true}
              onMax={onMax}
              onCurrencySelect={handleInputSelect}
              showETH={false}
              currency={inputCurrency}
              otherCurrency={outputCurrency}
              value={typedAmount}
              listType='StableSwap'
            ></CurrencyInputPanel>
            <ArrowWrapper clickable>
              <ArrowDown
                size="16"
              />
            </ArrowWrapper>
            <CurrencyInputPanel
              id="stable-swap-currency-input"
              label="To (Estimated): "
              onUserInput={() => {}}
              showMaxButton={false}
              onCurrencySelect={handleOutputSelect}
              showETH={false}
              currency={outputCurrency}
              otherCurrency={inputCurrency}
              value={out ?? '0.0'}
              listType='StableSwap'
            ></CurrencyInputPanel>
            // TODO: approve, execute button, errors
          </MainCard>
        </AppWrapperInner>
      </AppWrapper>
    </AppBody>
  )
}
