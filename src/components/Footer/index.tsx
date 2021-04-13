import React, {useState, useEffect} from 'react'
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
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
    axios("http://service.fuseswap.com/api/v1/price/0x0be9e53fd7edac9f859882afdda116645287c629")
    .then((response) => {
    setData(response.data);
    })
    .catch((error) => {
    console.error("Error fetching data: ", error);
    setError(error);
    })
    .finally(() => {
    setLoading(false);
    });
    console.log(loading,error,data);
    }, []);
    
  
  const size = [0, 0, 0];

  return (
    <Wrapper>
      {size.map((size, index) => (
      <NewsWrapper>
        <IconWrapper>
          <img src={fuse} alt="" />
        </IconWrapper>
          <span>Fuse Token price USD: 0.28</span>
      </NewsWrapper>
      ))};
    </Wrapper>
  )
};
