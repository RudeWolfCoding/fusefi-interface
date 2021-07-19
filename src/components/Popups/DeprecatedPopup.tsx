import React, { useContext, useState } from 'react'
import { AlertCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import TokenMigrationModal from '../../components/TokenMigration'
import { Currency } from '@fuseio/fuse-swap-sdk'
import { ButtonError } from '../../components/Button'

const RowFlex = styled('div')`
  display: flex;
`

const Icon = styled('div')`
  line-height: 4rem;
`
const Title = styled('div')`
  color: red;
  font-weight: 500;
  line-height: 3.25rem;
  width: 100%;
  text-align: center;
`

export default function DeprecatedPopup({ token, currency }: { token: string; currency?: Currency }) {
  const theme = useContext(ThemeContext)
  const [migrateModalOpen, setMigrateModalOpen] = useState(false)
  return (
    <div>
      <RowFlex>
        <Icon>
          <AlertCircle color={theme.red1} size={24} />
        </Icon>
        <Title>Your {token.replace(/\(Deprecated\)/, '')} token is deprecated!</Title>
      </RowFlex>
      <RowFlex>
        <ButtonError
          error={true}
          padding={'12px'}
          onClick={() => {
            setMigrateModalOpen(true)
          }}
        >
          Migrate {token}
        </ButtonError>
      </RowFlex>
      <TokenMigrationModal
        token={currency}
        isOpen={migrateModalOpen}
        onDismiss={() => setMigrateModalOpen(false)}
        listType="Swap"
      />
    </div>
  )
}
