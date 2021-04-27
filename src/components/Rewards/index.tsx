import React from 'react'
import styled from 'styled-components'

const Table = styled('table')`
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
`
const Th = styled('th')`
    width: 160px;
    padding: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: sticky;
    top: 0;
    text-align: left;
    font-weight: normal;
    font-size: 1.1rem;
    color: white;
    position: relative;
    border-bottom: solid 1px black;
`
const Button = styled('button')`
    background: white;
    border: none;
    font-weight: normal;
    font-size: 1.1rem;
    color: black;
    
`

const Tr = styled('tr')`
    padding: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: sticky;
    top: 0;
    background: white;
    text-align: left;
    font-weight: normal;
    font-size: 1.1rem;
    color: white;
    position: relative;
    :nth-child(even) Td{
         background:#ecebeb;
    }
`

const Td = styled('td')`
    padding: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 10px;
    color: #808080;
    width: 165px;
`

  const useSortableData = (items: any, config:any) => {
    const [sortConfig, setSortConfig] = React.useState(config);
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig!=null && sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key: any) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };
  
  export default (props: any) => {
    const { items, requestSort, sortConfig } = useSortableData([
        {untrackedVolumeUSD: '100',
            reserveETH: '20',
            reserveUSD: '1000',
            token0Price: '0.32',
            token1Price: '0.45',
            volumeUSD: '5000',
            liquidityProviderCount: '25000',
            reserve0: '25000',
            reserve1: '32000',
            apy: '142'
           
        },
        {untrackedVolumeUSD: '1000',
            reserveETH: '200',
            reserveUSD: '10000',
            token0Price: '0.302',
            token1Price: '0.405',
            volumeUSD: '50000',
            liquidityProviderCount: '250000',
            reserve0: '20',
            reserve1: '320000',
            apy: '142'
           
        },
        {untrackedVolumeUSD: '1000',
            reserveETH: '200',
            reserveUSD: '10000',
            token0Price: '0.302',
            token1Price: '0.405',
            volumeUSD: '50000',
            liquidityProviderCount: '250000',
            reserve0: '20',
            reserve1: '320000',
            apy: '142'
           
        },
        {untrackedVolumeUSD: '1000',
            reserveETH: '200',
            reserveUSD: '10000',
            token0Price: '0.302',
            token1Price: '0.405',
            volumeUSD: '50000',
            liquidityProviderCount: '250000',
            reserve0: '20',
            reserve1: '320000',
            apy: '142'
           
        },
        {untrackedVolumeUSD: '1000',
            reserveETH: '200',
            reserveUSD: '10000',
            token0Price: '0.302',
            token1Price: '0.405',
            volumeUSD: '50000',
            liquidityProviderCount: '250000',
            reserve0: '20',
            reserve1: '320000',
            apy: '142'
           
        },
    ], null);

    const getClassNamesFor = (name: string) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
      <Table>
        <thead>
          <tr>
            <Th>
              <Button
                type="button"
                onClick={() => requestSort('reserve0')}
                className={getClassNamesFor('reserve0')}
              >
                Reserve
              </Button>
            </Th>
            <Th>
              <Button
                type="button"
                onClick={() => requestSort('volumeUSD')}
                className={getClassNamesFor('volumeUSD')}
              >
                VolumeUSD
              </Button>
            </Th>
            <Th>
              <Button
                type="button"
                onClick={() => requestSort('apy')}
                className={getClassNamesFor('apy')}
              >
                APY
              </Button>
            </Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.reserveUSD}</Td>
              <Td>{item.volumeUSD}</Td>
              <Td>{item.apy}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    );
  };
