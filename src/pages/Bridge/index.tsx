import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react'
import * as Sentry from '@sentry/react'
import AppBody from '../AppBody'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { Currency, TokenAmount, ChainId } from '@fuseio/fuse-swap-sdk'
import { currencyId } from '../../utils/currencyId'
import {
  useBridgeActionHandlers,
  useBridgeState,
  useDerivedBridgeInfo,
  useBridgeStatus,
  useDetectBridgeDirection,
  BridgeDirection,
  useDefaultsFromURLSearch,
  useAddBridgeTransaction,
  useUnclaimedAmbBridgeTransaction,
  useUnclaimedNativeBridgeTransaction
} from '../../state/bridge/hooks'
import { Field } from '../../state/bridge/actions'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { AutoColumn } from '../../components/Column'
import { Wrapper, Loader, DestinationWrapper } from '../../components/bridge/styleds'
import styled, { ThemeContext } from 'styled-components'
import { BottomGrouping } from '../../components/bridge/styleds'
import { ButtonGradient, ButtonPrimary } from '../../components/Button'
import ethLogo from '../../assets/svg/eth-volt.svg'
import bnbLogo from '../../assets/svg/bsc-volt.svg'
import fuseLogo from '../../assets/svg/fuse-cropped.svg'
import loader from '../../assets/svg/loader.svg'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { RowBetween } from '../../components/Row'
import { Dots } from '../Pool/styleds'
import { Text } from 'rebass'
import { useActiveWeb3React, useChain } from '../../hooks'
import { UNSUPPORTED_BRIDGE_TOKENS } from '../../constants'
import { TYPE } from '../../theme'
import UnsupportedBridgeTokenModal from '../../components/UnsupportedBridgeTokenModal'
import { useUserActionHandlers } from '../../state/user/hooks'
import fuseApi from '../../api/fuseApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../state'
import { useTransactionAdder } from '../../state/transactions/hooks'
import BridgeDetails from '../../components/bridge/BridgeDetails'
import { getBridge, getApprovalAddress, supportRecipientTransfer, getBridgeType, isContract } from '../../utils'
import DestinationButton from '../../components/bridge/DestinationButton'
import FeeModal from '../../components/FeeModal'
import TokenMigrationModal from '../../components/TokenMigration'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import AutoSwitchNetwork from '../../components/AutoSwitchNetwork'
import AddressInputPanel from '../../components/AddressInputPanel'
import { FUSE_CHAIN } from '../../constants/chains'
import useAddChain from '../../hooks/useAddChain'
import AddTokenToMetamaskModal from '../../components/AddTokenToMetamaskModal'
import MainCard from '../../components/MainCard'
import { AppWrapper, AppWrapperInner } from '../../components/swap/styleds'
import ClaimAmbTransferModal from '../../components/ClaimAmbTransferModal'
import ClaimNativeTransferModal from '../../components/ClaimNativeTransferModal'
import { useAsyncMemo } from 'use-async-memo'
import ImportantIcon from '../../assets/svg/important.svg'

export const GradientWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  border: double 1px transparent;
  background-image: linear-gradient(#242637, #242637),
    linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(243, 252, 31, 1) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`

export default function Bridge() {
  const { account, chainId, library } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch<AppDispatch>()
  const { addChain, isAddChainEnabled } = useAddChain()

  const {
    inputCurrencyId: defaultInputCurrencyId,
    sourceChain,
    amount,
    recipient: defaultRecipient
  } = useDefaultsFromURLSearch()

  const [selectedBridgeDirection, setSelectedBridgeDirection] = useState<BridgeDirection | undefined>()
  const bridgeDirection = useDetectBridgeDirection(selectedBridgeDirection)

  const [migrationCurrency, setMigrationCurrency] = useState<Currency | undefined>()

  const {
    independentField,
    typedValue,
    recipient,
    currentAmbBridgeTransaction,
    currentNativeBridgeTransaction
  } = useBridgeState()

  const {
    currencies,
    currencyBalances,
    parsedAmounts,
    inputError,
    bridgeTransactionStatus,
    inputCurrencyId
  } = useDerivedBridgeInfo(bridgeDirection)

  const { [Field.INPUT]: inputCurrency } = currencies

  const bridgeStatus = useBridgeStatus(bridgeTransactionStatus)

  const { updateCompletedBridgeTransfer } = useUserActionHandlers()

  const {
    onFieldInput,
    onSelectBridgeDirection,
    onSelectCurrency,
    onSetRecipient,
    onSetCurrentBridgeTransaction
  } = useBridgeActionHandlers()

  // unsupportedBridge modal
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [feeModalOpen, setFeeModalOpen] = useState(false)

  const [migrateModalOpen, setMigrateModalOpen] = useState(false)

  const [addTokenModalOpen, setAddTokenModalOpen] = useState(false)

  const [claimTransferModalOpen, setClaimTransferModalOpen] = useState(false)

  const [limitReached] = useState(true)

  const formattedAmounts = {
    [independentField]: typedValue
  }

  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.INPUT].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field])
    }
  }, {})

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.INPUT].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0')
    }
  }, {})

  const toggleWalletModal = useWalletModalToggle()

  const { isHome, isEtheruem, isBsc } = useChain()

  const approvalAddress = getApprovalAddress(inputCurrencyId, bridgeDirection)

  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.INPUT], approvalAddress)

  const addTransaction = useTransactionAdder()

  const addBridgeTransaction = useAddBridgeTransaction()

  const supportRecipient = useMemo(() => {
    return supportRecipientTransfer(inputCurrencyId, bridgeDirection) && !isHome
  }, [bridgeDirection, inputCurrencyId, isHome])

  async function onTransfer() {
    if (!chainId || !library || !account || !inputCurrency?.symbol || !bridgeDirection) return

    try {
      const { [Field.INPUT]: parsedAmountInput } = parsedAmounts

      if (!parsedAmountInput || !inputCurrencyId) {
        return
      }

      const Bridge = getBridge(inputCurrencyId, bridgeDirection)

      if (!Bridge) return

      const bridge = new Bridge(
        inputCurrencyId,
        inputCurrency.symbol,
        parsedAmountInput,
        library,
        chainId,
        account,
        dispatch,
        isHome,
        addTransaction,
        recipient
      )

      const response = await bridge?.executeTransaction()
      if (response) {
        if (isEtheruem || isBsc) {
          await fuseApi.fund(account)
        }

        if (bridgeDirection === BridgeDirection.FUSE_TO_ETH) {
          const bridgeType = getBridgeType(inputCurrencyId, bridgeDirection)
          const bridgeTransaction = {
            homeTxHash: response.hash,
            bridgeDirection,
            bridgeType
          }
          addBridgeTransaction(bridgeTransaction)
          onSetCurrentBridgeTransaction(bridgeTransaction)
          setClaimTransferModalOpen(true)
        }

        onSetRecipient('')
        updateCompletedBridgeTransfer()
        setAddTokenModalOpen(true)
      }

      onFieldInput('')
    } catch (error) {
      if (error?.code !== 4001) {
        Sentry.captureException(error, {
          tags: {
            section: 'Bridge'
          }
        })

        console.log(error)
      }
    }
  }

  const handleDestinationSelect = useCallback(
    (bridgeDirection: BridgeDirection) => {
      setSelectedBridgeDirection(bridgeDirection)
      onSelectBridgeDirection(bridgeDirection)
      // reset currency on bridge selection
      onSelectCurrency('')
    },
    [onSelectBridgeDirection, onSelectCurrency]
  )

  const handleInputCurrencySelect = useCallback(
    (inputCurrency: Currency) => {
      if (inputCurrency.symbol && UNSUPPORTED_BRIDGE_TOKENS.includes(inputCurrency.symbol)) {
        setModalOpen(true)
        return
      }

      const token = inputCurrency instanceof WrappedTokenInfo ? inputCurrency : undefined

      if (token?.isDeprecated) {
        setMigrationCurrency(inputCurrency)
        setMigrateModalOpen(true)
        return
      }

      onSelectCurrency(currencyId(inputCurrency))
    },
    [onSelectCurrency]
  )

  const isAccountContract = useAsyncMemo(() => {
    if (!library || !account) return null
    return isContract(library, account)
  }, [library, account])

  // check if we have unconfirmed transactions
  const unclaimedAmbTransaction = useUnclaimedAmbBridgeTransaction()
  useEffect(() => {
    if (unclaimedAmbTransaction) {
      onSetCurrentBridgeTransaction(unclaimedAmbTransaction)
      setClaimTransferModalOpen(true)
    }
  }, [onSetCurrentBridgeTransaction, unclaimedAmbTransaction])

  const unclaimedNativeBridgeTransaction = useUnclaimedNativeBridgeTransaction()
  useEffect(() => {
    if (unclaimedNativeBridgeTransaction) {
      onSetCurrentBridgeTransaction(unclaimedNativeBridgeTransaction)
      setClaimTransferModalOpen(true)
    }
  }, [onSetCurrentBridgeTransaction, unclaimedNativeBridgeTransaction])

  // set defaults from url params

  useEffect(() => {
    onSelectCurrency(defaultInputCurrencyId)
  }, [defaultInputCurrencyId, onSelectCurrency])

  useEffect(() => {
    if (amount) onFieldInput(amount)
  }, [amount, onFieldInput])

  useEffect(() => {
    if (defaultRecipient && supportRecipient) onSetRecipient(defaultRecipient)
  }, [defaultRecipient, onSetRecipient, supportRecipient])

  return (
    <>
      <AppBody>
        <AppWrapper>
          <AppWrapperInner>
            <TYPE.main lineHeight={'39px'} fontSize={32} fontWeight={600} color="#FFFFF" marginBottom="18px">
              Bridge
            </TYPE.main>
            <Wrapper style={{ padding: '10px', marginBottom: '10px' }}>
              <AutoSwitchNetwork chainId={sourceChain} />
              <UnsupportedBridgeTokenModal isOpen={modalOpen} setIsOpen={setModalOpen} />
              <FeeModal isOpen={feeModalOpen} onDismiss={() => setFeeModalOpen(false)} />
              <TokenMigrationModal
                token={migrationCurrency}
                isOpen={migrateModalOpen}
                onDismiss={() => setMigrateModalOpen(false)}
                listType="Bridge"
              />
              <AddTokenToMetamaskModal
                isOpen={addTokenModalOpen}
                setIsOpen={setAddTokenModalOpen}
                currency={inputCurrency}
              />
              {currentAmbBridgeTransaction && (
                <ClaimAmbTransferModal
                  isOpen={claimTransferModalOpen}
                  onDismiss={() => setClaimTransferModalOpen(false)}
                  bridgeTransaction={currentAmbBridgeTransaction}
                />
              )}
              {currentNativeBridgeTransaction && (
                <ClaimNativeTransferModal
                  isOpen={claimTransferModalOpen}
                  onDismiss={() => setClaimTransferModalOpen(false)}
                  bridgeTransaction={currentNativeBridgeTransaction}
                />
              )}
              {isHome ? (
                <AutoColumn gap="16px">
                  <TYPE.mediumHeader textAlign={'center'} color={theme.white} fontSize={16}>
                    Select Destination
                  </TYPE.mediumHeader>
                  <DestinationWrapper>
                    <DestinationButton
                      text="Ethereum"
                      logoSrc={ethLogo}
                      color={theme.ethereum}
                      colorSelect="rgba(98, 126, 234, 0.2)"
                      selectedBridgeDirection={bridgeDirection}
                      bridgeDirection={BridgeDirection.FUSE_TO_ETH}
                      handleClick={handleDestinationSelect}
                    />
                    <DestinationButton
                      text="BSC"
                      logoSrc={bnbLogo}
                      color={theme.binance}
                      colorSelect="rgba(243, 186, 47, 0.2)"
                      selectedBridgeDirection={bridgeDirection}
                      bridgeDirection={BridgeDirection.FUSE_TO_BSC}
                      handleClick={handleDestinationSelect}
                    />
                  </DestinationWrapper>
                </AutoColumn>
              ) : (
                <AutoColumn gap="md">
                  <TYPE.mediumHeader textAlign={'center'} color={theme.white} fontSize={16} marginTop={2}>
                    Select Destination
                  </TYPE.mediumHeader>
                  <DestinationWrapper>
                    <DestinationButton
                      text="Fuse"
                      logoSrc={fuseLogo}
                      color={theme.ethereum}
                      colorSelect="rgba(98, 126, 234, 0.2)"
                      handleClick={() => {
                        console.log('click')
                      }}
                    />
                  </DestinationWrapper>
                </AutoColumn>
              )}
            </Wrapper>
            <MainCard>
              <TYPE.mediumHeader color={'#B5B9D3'} fontSize={14} fontWeight={500} marginBottom={2}>
                Select Currency
              </TYPE.mediumHeader>
              <Wrapper id="bridge-page" style={{ paddingInline: '40px' }}>
                <AutoColumn gap={'md'}>
                  <CurrencyInputPanel
                    bridge={true}
                    label="Amount"
                    value={formattedAmounts[Field.INPUT]}
                    onUserInput={onFieldInput}
                    onCurrencySelect={handleInputCurrencySelect}
                    onMax={() => {
                      onFieldInput(maxAmounts[Field.INPUT]?.toExact() ?? '')
                    }}
                    currency={currencies[Field.INPUT]}
                    showMaxButton={!atMaxAmounts[Field.INPUT]}
                    id="bridge-input-token"
                    showETH={isHome || isBsc}
                    listType="Bridge"
                  />
                </AutoColumn>
                {recipient && supportRecipient && (
                  <AutoColumn gap="md" style={{ marginTop: '1rem' }}>
                    <AddressInputPanel
                      id="recipient"
                      value={recipient}
                      onChange={onSetRecipient}
                      readOnly
                      chainId={ChainId.FUSE}
                    />
                  </AutoColumn>
                )}

                <BottomGrouping>
                  {!account ? (
                    isAddChainEnabled ? (
                      <ButtonGradient onClick={() => addChain(FUSE_CHAIN)}>Switch to Fuse</ButtonGradient>
                    ) : (
                      <ButtonGradient onClick={toggleWalletModal}>Connect Wallet</ButtonGradient>
                    )
                  ) : (
                    <AutoColumn gap={'md'}>
                      {(approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING) && (
                        <RowBetween>
                          <ButtonPrimary
                            onClick={approveCallback}
                            disabled={approval === ApprovalState.PENDING}
                            width="100%"
                          >
                            {approval === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.INPUT]?.symbol}</Dots>
                            ) : (
                              'Approve ' + currencies[Field.INPUT]?.symbol
                            )}
                          </ButtonPrimary>
                        </RowBetween>
                      )}
                      <ButtonGradient
                        id="bridge-transfer-button"
                        onClick={onTransfer}
                        disabled={
                          approval !== ApprovalState.APPROVED || !!inputError || !!bridgeStatus || isAccountContract
                        }
                        error={
                          approval !== ApprovalState.APPROVED || (!bridgeStatus && !!inputError) || isAccountContract
                        }
                      >
                        {bridgeStatus ? (
                          <>
                            <Loader src={loader} />
                            <Text fontSize={16} fontWeight={500}>
                              {bridgeStatus}
                            </Text>
                          </>
                        ) : (
                          <Text fontSize={16} fontWeight={500}>
                            {inputError ?? 'Transfer'}
                          </Text>
                        )}
                      </ButtonGradient>
                    </AutoColumn>
                  )}
                </BottomGrouping>
                <BridgeDetails
                  inputCurrencyId={inputCurrencyId}
                  inputAmount={parsedAmounts[Field.INPUT]}
                  bridgeDirection={bridgeDirection}
                />
              </Wrapper>
            </MainCard>
            {limitReached && (
              <GradientWrapper style={{ marginTop: '10px' }}>
                <img
                  src={ImportantIcon}
                  alt={'important'}
                  style={{ width: '10px', margin: '10px', marginBottom: '0px' }}
                />
                <TYPE.main
                  padding={'40px'}
                  paddingTop={'3px'}
                  paddingBottom={'3px'}
                  textAlign={'center'}
                  fontSize={14}
                  fontWeight={400}
                  color="#FFFFF"
                >
                  Bridge network limit has been reached for this token, please select other or wait to the network
                  resets
                </TYPE.main>
                <TYPE.main
                  width={'100%'}
                  textAlign={'center'}
                  fontSize={16}
                  fontWeight={700}
                  color="#FFFFF"
                  marginBottom={'10px'}
                >
                  12:00:00
                </TYPE.main>
              </GradientWrapper>
            )}
            {isAccountContract && (
              <GradientWrapper style={{ marginTop: '10px' }}>
                <TYPE.main
                  width={'100%'}
                  textAlign={'center'}
                  fontSize={16}
                  fontWeight={600}
                  color="#FFFFF"
                  marginTop="12px"
                >
                  Important!
                </TYPE.main>
                <TYPE.main padding={10} textAlign={'center'} fontSize={14} fontWeight={400} color="#FFFFF">
                  We currently dont support bridge transactions sent from a wallet contract (like FuseCash). Your funds
                  are probably going to get lost if you transfer.{' '}
                </TYPE.main>
              </GradientWrapper>
            )}
            {bridgeDirection === BridgeDirection.FUSE_TO_ETH && (
              <GradientWrapper style={{ marginTop: '10px' }}>
                <TYPE.main
                  width={'100%'}
                  textAlign={'center'}
                  fontSize={16}
                  fontWeight={600}
                  color="#FFFFF"
                  marginTop="12px"
                >
                  Important!
                </TYPE.main>
                <TYPE.main padding={10} textAlign={'center'} fontSize={14} fontWeight={400} color="#FFFFF">
                  Ethereum claim fees apply and will be paid by the user, be aware of the gas costs
                </TYPE.main>
              </GradientWrapper>
            )}
          </AppWrapperInner>
        </AppWrapper>
      </AppBody>
    </>
  )
}
