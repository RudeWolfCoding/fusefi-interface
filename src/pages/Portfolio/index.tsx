import React from 'react'
import styled from 'styled-components'
import Card from '../../components/home/Card'
import { animated } from 'react-spring'
import fuse from '../../assets/svg/voltBanner.svg'
import volt from '../../assets/svg/pairs/volt.svg'
import fUSD from '../../assets/svg/pairs/fusd.svg'
import btc from '../../assets/svg/pairs/btc.svg'
import weth from '../../assets/svg/pairs/weth2.svg'
import link from '../../assets/svg/linkVolt.svg'

const CardWrap = styled.div`
  display: flex;
  flex-basis: 25%;
  flex-direction: column;
  align-items: center;
  background: #202231;
  color: white;
  padding: 10px 16px;
  margin: 0 2.5px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 0 0 1rem 0;
  `}
`

const ValueWrapper = styled.div`
  font-size: 24px;
  font-weight: 500;
`

const Value = styled(animated.h2)`
  display: inline-block;
  font-size: 24px;
  color: white;
  margin: 0;
`

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #fffffff;
  margin-top: 8px;
  margin-bottom: 20px;
  > img {
    margin-bottom: -6px;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 3;
}
${({ theme }) => theme.mediaWidth.upToMedium`
flex-direction: column;
`}

div:nth-child(1) {
border-top-left-radius: 12px;
border-bottom-left-radius: 12px;
}
div:nth-child(3) {
border-top-right-radius: 12px;
border-bottom-right-radius: 12px;
}
`

const LeftPanel = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 9px;
  margin-left: 3px;
  >div{
    padding: 20px;
    border-radius: 12px;
    width: 100%
    background: #202231;  
    >img{
      margin-bottom: -6px;
    }
    >p{
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: 800;
    }
  }


}`

const RightPanel = styled.div`
  position: relative;
  width: 25%;
  display: flex;
  padding: 40px;
  flex-wrap: wrap;
  margin-left: 11px;
  margin-top: 9px;
  background: linear-gradient(92.18deg, rgba(58, 216, 137, 0.25) -2.78%, rgba(243, 252, 31, 0.25) 102.81%);
  border-radius: 12px;
    >p{
    width: 100%;
    padding: 0px;
    margin: 0;
    font-weight: bold;
font-size: 24px;
line-height: 100%;
  }
  h2{
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(96.84deg, #3ad889 -30.84%, #f3fc1f 119.45%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

}`

const Positions = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
`

export default function HomePrices() {
  return (
    <>
      <Wrapper style={{ marginTop: '12%' }}>
        <Card title="Net Worth" value={'$ 5558'} />
        <Card title="Total Supply" value={'$ 4500'} />
        <CardWrap>
          <Title>
            <img src={volt} alt="icon" />
            500
          </Title>
          <ValueWrapper>
            <Value>
              <button
                style={{
                  background: 'linear-gradient(93.58deg, #3AD8A4 -105.35%, #F3FC1F 103.54%)',
                  borderRadius: '5px',
                  border: 'none',
                  padding: '5px',
                  paddingInline: '45px'
                }}
              >
                Claim
              </button>
            </Value>
          </ValueWrapper>
        </CardWrap>
      </Wrapper>
      <Wrapper>
        <LeftPanel>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ marginBottom: '10px' }}>Active Position</p>
            <Positions>
              <div>
                <span>
                  <img src={fUSD} style={{ marginBottom: '-3px' }} alt="icon"></img> FUSD -{' '}
                  <img src={volt} style={{ marginBottom: '-9px' }} alt="icon"></img>VOLT
                </span>{' '}
                770
              </div>
              <div>
                <span>
                  <img src={weth} alt="icon"></img> WETH - <img src={btc} style={{ marginBottom: '-9px' }} alt="icon"></img>BTC
                </span>{' '}
                770
              </div>
            </Positions>
          </div>

          <div>
            <Positions>
              <div>
                <span>
                  Next unvesting in: <b>01:00:00</b>
                </span>{' '}
                <span>
                  <img src={volt} style={{ marginBottom: '-9px' }} alt="icon"></img>10
                </span>
              </div>
              <div>
                <span>
                  Total vested: <img src={volt} style={{ marginBottom: '-9px' }} alt="icon" />
                  10
                </span>
              </div>
            </Positions>
          </div>
        </LeftPanel>
        <RightPanel>
          <p>STAKING</p>
          <p>VOLT</p>
          <h2>APR 23.84%</h2>
          <img src={fuse} style={{ margin: 'auto' }} alt="icon" width="150px" />
          <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
            <img src={link} alt="icon" />
          </div>
        </RightPanel>
      </Wrapper>
    </>
  )
}
