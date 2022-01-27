import { parseBytes32String } from '@ethersproject/strings'
import { Currency, ETHER, Token, currencyEquals } from '@fuseio/fuse-swap-sdk'
import { useMemo } from 'react'
import { useSelectedSwapTokenList, useSelectedBridgeTokenList } from '../state/lists/hooks'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useUserAddedTokens } from '../state/user/hooks'
import { isAddress } from '../utils'
import { STABLESWAP_POOLS } from '../constants'

import { useActiveWeb3React } from './index'
import { useBytes32TokenContract, useTokenContract } from './useContract'
import { BNB } from '../data/Currency'
import { tryParseAmount } from '../state/swap/hooks'

export function useAllSwapTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useSelectedSwapTokenList()

  return useMemo(() => {
    if (!chainId) return {}
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap, token) => {
            tokenMap[token.address] = token
            return tokenMap
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          { ...allTokens[chainId] }
        )
    )
  }, [chainId, userAddedTokens, allTokens])
}

function useStableSwapTokenList(poolAddress: string | null): Token[] {
  return useMemo(() => {
    if(!poolAddress || !STABLESWAP_POOLS[poolAddress]) return []
    return STABLESWAP_POOLS[poolAddress].tokenList
  }, [poolAddress])
}

export function useStableSwapPooledTokenIndex(poolAddress: string | null, pooledToken: Token | undefined): number|null {
    const tokenList = useStableSwapTokenList(poolAddress)

    return useMemo(() => {
      if(!pooledToken || !poolAddress) return null
      let res = tokenList.findIndex((token:Token) => {
        return currencyEquals(pooledToken, token)
      })
      return res !== -1 ? res:null
    }, [poolAddress, pooledToken, tokenList])
}

export function useOneToken(token: Token | undefined){
  return tryParseAmount('1', token)
}

export function useStableSwapTokens(): { [address: string]: Token} {
  const poolAddress = localStorage.getItem('stablePoolAddress') // TODO: again redux
  const { chainId } = useActiveWeb3React()
  const pooledTokens = useStableSwapTokenList(poolAddress)
  // const allTokens = useSelectedSwapTokenList()
  
  return useMemo(() => {
    if(!chainId || !poolAddress) return {}
    let ret: { [address: string]: Token } = {}
    pooledTokens.forEach((token)=> {
      ret[token.address] = token
    })
    return ret
  }, [poolAddress, chainId, pooledTokens])
}

export function useAllBridgeTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useSelectedBridgeTokenList()

  return useMemo(() => {
    if (!chainId) return {}
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap, token) => {
            tokenMap[token.address] = token
            return tokenMap
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          { ...allTokens[chainId] }
        )
    )
  }, [chainId, userAddedTokens, allTokens])
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency): boolean {
  const userAddedTokens = useUserAddedTokens()
  return !!userAddedTokens.find(token => currencyEquals(currency, token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/
function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string, listType?: CurrencyListType): Token | undefined | null {
  const { chainId } = useActiveWeb3React()
  const useAllTokens = listType === 'Swap' ? useAllSwapTokens : useAllBridgeTokens
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result
  ])
}

export function useCurrency(
  currencyId: string | undefined,
  listType: CurrencyListType = 'Swap'
): Currency | null | undefined {
  const isETH = currencyId?.toUpperCase() === 'FUSE'
  const isBNB = currencyId?.toUpperCase() === 'BNB'
  const token = useToken(isETH ? undefined : currencyId, listType)
  return isETH ? ETHER : isBNB ? BNB : token
}
