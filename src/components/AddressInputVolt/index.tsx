import React, { useCallback } from 'react'
import styled from 'styled-components'
import useENS from '../../hooks/useENS'
import { AutoColumn } from '../Column'
import { ChainId } from '@fuseio/fuse-swap-sdk'

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  z-index: 1;
  width: 100%;
`

const ContainerRow = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: 0.5px solid ${({ error, theme }) => (error ? theme.red1 : '#B5B9D3')};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
`

const InputContainer = styled.div`
  flex: 1;
  padding: 0.25rem;
  border-radius: 0.25rem;
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 12px;
  line-height: 14px;
  outline: none;
  border: none;
  background: black;
  flex: 1 1 auto;
  width: 0;
  height: 30px;
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : '#B5B9D3')};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding-left: 10px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

export default function AddressInputPanel({
  id,
  value,
  onChange,
  readOnly = false
}: {
  id?: string
  // the typed string value
  value: string
  // triggers whenever the typed value changes
  onChange: (value: string) => void
  chainId?: ChainId
  readOnly?: boolean
}) {
  const { address, loading } = useENS(value)

  const handleInput = useCallback(
    event => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange]
  )

  const error = Boolean(value.length > 0 && !loading && !address)

  return (
    <InputPanel id={id}>
      <ContainerRow error={error}>
        <InputContainer>
          <AutoColumn gap="md">
            <Input
              className="recipient-address-input"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Provide Wallet Addresss"
              error={error}
              pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={handleInput}
              value={value}
              readOnly={readOnly}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
