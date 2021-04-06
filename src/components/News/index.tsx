import React from 'react'
import {useState} from "react";
import styled from 'styled-components'
import fuse from '../../assets/svg/fuse_sub.svg'
import { ChevronUp } from 'react-feather'
import Card from '../MainCard'

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  border-bottom: solid 2px #E4DDDD;
  line-height: 0rem;
`
export const HeaderItem = styled.div`
  display: flex;
  flex: 1 1 90%;
  flex-wrap: wrap;
  padding-bottom: 1rem;
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
transition: all 0.4s;`

export default function NewsModal() {
  const [open,setOpen] = useState(false);
  const articles = [
    {
    title: 'Article 1',
    description: 'Magna consectetur elit magna deserunt excepteur irure voluptate commodo do ipsum.',
    link: ''
  },
  {
    title: 'Article 2',
    description: 'Deserunt non occaecat tempor excepteur amet id sint eu laborum in.',
    link: ''
  },
  {
    title: 'Article 3',
    description: 'Est do dolor voluptate Lorem laborum ad ex pariatur anim id ea.',
    link: ''
  },

]
  const toggle = () => {setOpen(!open)}

  return (
    <Card>
      <Header onClick={toggle}>
       <HeaderItem>
        <div>
          <img src={fuse} alt="test" width="32px"></img> 
        </div>
        <div>
          <h4>News</h4>
        </div>
       </HeaderItem>
        <HeaderOptions size={open? '-175' : '0'} y={open? '25' : '0'}>
        <ChevronUp />
        </HeaderOptions>
      </Header>

      <ExpandableWrapper>
        <Content size={open ? '0' : '-100'}>
        {articles.map((article, index) => (
          <div>
          <h4>{article.title}</h4>
          <p>{article.description}</p>
          <a href={article.link}>Read More</a>
          </div>
        ))}
        </Content>
      </ExpandableWrapper>
    </Card>
  );
}