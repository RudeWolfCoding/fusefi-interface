import React from 'react'
import styled from 'styled-components'
import fuse from '../../assets/svg/fuse.svg'
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex: flex-wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 2.25rem;
  background-color: black;
  z-index: 100;
}
`

const NewsWrapper = styled.div`
  width: 100%;
  padding-left: 100%; /* Push contents to right side of screen */
}
`
const NewsMover = styled.div`
  @keyframes ticker {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
  }
  display: inline-block;
  white-space: nowrap;
  padding-right: 100%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ticker;
  animation-duration: 20s;
  }
  :hover{
  animation-play-state: paused;
  }
`
const News = styled.div`
  display: inline-block;
  width: 33%;
  padding: 0 2rem;
  line-height: 2rem;
  color: white;
  > img {
    padding-top: 0.5rem;
    margin-right: 0.5rem;
  }

`


export default function Footer() {
  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://service.fuseswap.com/api/v1/price/0x0be9e53fd7edac9f859882afdda116645287c629",
    })
    .then((response) => {
      setResponseData(response.data.data.price)
      console.log(response.data.price);
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])
    

  const size = [0, 0, 0, 0, 0, 0 ];
  return (
    <Container>
      <NewsWrapper>
        <NewsMover>
          {size.map((size, index) => (
            <News>
            <img src={fuse} height="24px" />
            {responseData && <span>Fuse Token Price: {parseFloat(responseData).toFixed(2)} USD</span>}
            </News>
          ))};
        </NewsMover>
      </NewsWrapper>
    </Container>
  )
};
