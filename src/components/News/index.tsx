import React from 'react'
import {useState} from "react";
import styled from 'styled-components'
import fuse from '../../assets/svg/fuse_sub.svg'
import { ChevronUp } from 'react-feather'
import Card from '../MainCard'
import {articles} from './articles.js'

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  line-height: 0rem;
  padding-bottom: 0.75rem;
`
export const HeaderItem = styled.div`
  display: flex;
  flex: 1 1 90%;
  flex-wrap: wrap;
  font-size: 1.25rem;
  line-height: 2.5rem;
  font-weight: 500;
  > img{
    margin-right: 1rem;
  }
`
const HeaderOptions = styled("div")<{ size: string, y: string }>`
  display: flex;
  flex: 1 1 10%;
  flex-wrap: wrap;
  transform: rotateX(${({ size }) => size}deg) translateX(10px) translateY(${({ y }) => y}px);
  transition: all 1s;
`

const ExpandableWrapper = styled.div`
  overflow: hidden;
`

const Content = styled("div")<{ size: string }>`
  margin-top: ${({ size }) => size}%;
  transition: all 0.4s;
`

const Article = styled("div")`
  padding-bottom: 1.25rem;
`

const Title = styled("a")`
  display: inline-block;
  position: relative;
  width:100%;
  overflow: hidden;
  color: ${({ theme }) => theme.text1};
  vertical-align: bottom;
  text-decoration: none;
  text-align:center;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 16px;
  line-height: 2rem;
  z-index: 0;
  transition: color .3s ease-out;

  ::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    transform: translateY(calc(100% - 2px));
    width: 100%;
    height: 100%;
    background-image: linear-gradient(50deg, #F5F378 0%, #9FFCB4 100%);
    transition: transform .35s ease-out;
  }
  
  :hover { 
    color: #000000; 
    font-weight: 600;
  }

  :hover::before {
    transform: translateY(0);
    transition: transform .25s ease-out;
  }
`

export default function NewsModal() {
  const [open,setOpen] = useState(true);
  const toggle = () => {setOpen(!open)}

  return (
    <Card>
      <Header onClick={toggle}>
       <HeaderItem>
          <img src={fuse} alt="test" width="32px"></img> 
          News
       </HeaderItem>
        <HeaderOptions size={open? '-170' : '0'} y={open? '10' : '0'}>
        <ChevronUp />
        </HeaderOptions>
      </Header>

      <ExpandableWrapper>
        <Content size={open ? '0' : '-220'}>
          {articles.map((article, index) => (
            <Article>
              <Title href={article.link}> -  {article.title}</Title>
            </Article>
          ))}
        </Content>
      </ExpandableWrapper>
    </Card>
  );
}