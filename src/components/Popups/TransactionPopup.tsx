import React, { useContext } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { TYPE } from '../../theme'
import { ExternalLink } from '../../theme/components'
import { getExplorerLink, getExplorerLinkText } from '../../utils'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`
const Row = styled(AutoRow)`
  flex-wrap: wrap;
  justify-content: flex-end;
`
export default function TransactionPopup({
  hash,
  success,
  summary
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { chainId } = useActiveWeb3React()

  const theme = useContext(ThemeContext)

  return (
    <>
      <RowNoFlex>
        <div style={{ paddingRight: 16 }}>
          {success ? <CheckCircle color={theme.green1} size={24} /> : <AlertCircle color={theme.red1} size={24} />}
        </div>
        <AutoColumn gap="8px">
          <TYPE.body fontWeight={500} fontSize={'16px'} color={'#111219'}>
            {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
          </TYPE.body>
        </AutoColumn>
      </RowNoFlex>
      <Row>
        {chainId && (
          <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')}>
            {getExplorerLinkText(chainId)}
          </ExternalLink>
        )}
      </Row>
    </>
  )
}
