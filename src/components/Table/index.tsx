import styled from 'styled-components'

export const TableWrapper = styled.div`
  overflow-x: auto;
`

export const Table = styled.table`
  background: #232638;
  border-radius: 16px;
  font-size: 16px;
  width: 100%;
  border-collapse: collapse;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    table-layout: fixed;
    width: 1000px;
  `}
`

export const Th = styled.th`
  border-bottom: 1px solid ${({ theme }) => theme.secondary4};
  padding 12px 16px;
  font-weight: 500;
`

export const TBodyTr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.secondary4};

  :hover {
    background-color: ${({ theme }) => theme.secondary4};
    cursor: pointer;
  }
`

export const TBodyTd = styled.td`
  padding: 12px 16px;
`
