import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex-wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 2rem;
  background-color: black;
  box-sizing: content-box;
}
`

const NewsWrapper = styled.div`
  display: inline-block;
  height: 2rem;
  line-height: 2rem;
  white-space: nowrap;
  padding-right: 100%;
  box-sizing: content-box;
}
`

export default function Footer() {
  const [data, setData] = useState<any[]>([])
  const getData = () =>
    fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=&vs_currencies=usd')
      .then((res) => res.json())

    useEffect(() => {
        getData().then((data) => setData(data.body))
    }, [])

  return (
    <Wrapper>
      <NewsWrapper>
      {data}
      </NewsWrapper>
    </Wrapper>
  )
};
