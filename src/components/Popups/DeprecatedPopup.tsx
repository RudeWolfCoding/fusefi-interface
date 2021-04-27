import React, { useContext, useState } from 'react'
import { AlertCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import { AutoRow } from '../Row'
import TokenMigrationModal from '../../components/TokenMigration'
import { Currency } from '@fuseio/fuse-swap-sdk'

const RowFlex = styled(AutoRow)`
  flex-wrap: wrap;
`

export default function TransactionPopup({
  token,
  currency,
}: {
  token: string
  currency?: Currency
}) {

  const theme = useContext(ThemeContext)
  const [migrateModalOpen, setMigrateModalOpen] = useState(false)
  return (
    <RowFlex>
      <div style={{ paddingRight: 16 }}>
        <AlertCircle color={theme.red1} size={24} /> Your {token} token is deprecated!
      </div>
      <div>
        <a onClick={()=>{setMigrateModalOpen(true)}}>Click here to transfer old {token} to new contract address.</a>
        <TokenMigrationModal
            token={currency}
            isOpen={migrateModalOpen}
            onDismiss={() => setMigrateModalOpen(false)}
            listType="Swap"
          />
      </div>
    </RowFlex>
  )
}
