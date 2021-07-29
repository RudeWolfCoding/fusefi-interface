import { useState, useEffect } from 'react'
import { getSwapStats } from '../utils/farm'

const useFuseswapStats = () => {
  const [stats, setResponse] = useState({ pairCount: '0', totalLiquidityUSD: '0', totalVolumeUSD: '0' })

  const fetchData = async () => {
    return await getSwapStats()
  }

  useEffect(() => {
    fetchData().then(res => {
      setResponse(res)
    })
  }, [])

  return stats
}

export default useFuseswapStats
