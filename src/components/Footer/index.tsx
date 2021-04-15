import React from 'react'
import styled from 'styled-components'
import fuse from '../../assets/svg/fuse.svg'
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex: flex-wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 2rem;
  background-color: black;
  z-index: 100;
}
`

const NewsWrapper = styled.div`
  display: flex;
  height: 2rem;
  line-height: 2rem;
  width: 33.3%;
  color: #FFFFFF;
  text-align: center;
}
`
const IconWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  display: inline;
  & > img,
  span {
    height: 100%;
    padding: 0.25rem;
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
    

  const size = [0, 0, 0];
  return (
    <Wrapper>
      {size.map((size, index) => (
      <NewsWrapper>
        <IconWrapper>
          <img src={fuse} alt="" />
        </IconWrapper>
        {responseData &&
        <div>
         Fuse Token Price: {parseFloat(responseData).toFixed(3)} USD
        </div>         
        }
      </NewsWrapper>
      ))};
    </Wrapper>
  )
};
