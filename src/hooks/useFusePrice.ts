import { useState, useEffect } from 'react'
import axios from 'axios'

const useFusePrice = () => {
  const [response, setResponse] = useState('0.0')
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  const fetchData = () => {
    axios
      .get('https://service.fuseswap.com/api/v1/price/0x0be9e53fd7edac9f859882afdda116645287c629')
      .then(res => {
        setResponse(res.data.data.price)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { response, error, loading }
}

export default useFusePrice
