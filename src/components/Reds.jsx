import { time } from 'console'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import { StatisticsContext } from '../context/StatisticsContext'
import Button from './mini_components/Button'

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  color: black;
  padding: 10px;
  height: 170px;
  width: 170px;
  flex-wrap: wrap;
  margin-left: 15px;
`
const Reds = props => {
  return (
    <Container>
      <Button style={{background: 'red', color: 'white'}} onClick={() => fetch('http://localhost:4545/GFX_reds/1')}>H1 IN</Button>
      <Button style={{background: 'red', color: 'white'}} onClick={() => fetch('http://localhost:4545/GFX_reds/2')}>H2 IN</Button>
      <Button style={{background: 'red', color: 'white'}} onClick={() => fetch('http://localhost:4545/GFX_reds/3')}>H3 IN</Button>
      <Button style={{background: 'red', color: 'white'}} onClick={() => fetch('http://localhost:4545/GFX_reds/4')}>A1 IN</Button>
      <Button style={{background: 'red', color: 'white'}} onClick={() => fetch('http://localhost:4545/GFX_reds/5')}>A2 IN</Button>
      <Button style={{background: 'red', color: 'white'}} onClick={() => fetch('http://localhost:4545/GFX_reds/6')}>A3 IN</Button>
      <Button style={{background: 'grey'}}  onClick={() => fetch('http://localhost:4545/GFX_reds_OUT/1')}>H1 OUT</Button>
      <Button style={{background: 'grey'}}  onClick={() => fetch('http://localhost:4545/GFX_reds_OUT/2')}>H2 OUT</Button>
      <Button style={{background: 'grey'}}  onClick={() => fetch('http://localhost:4545/GFX_reds_OUT/3')}>H3 OUT</Button>
      <Button style={{background: 'grey'}}  onClick={() => fetch('http://localhost:4545/GFX_reds_OUT/4')}>A1 OUT</Button>
      <Button style={{background: 'grey'}}  onClick={() => fetch('http://localhost:4545/GFX_reds_OUT/5')}>A2 OUT</Button>
      <Button style={{background: 'grey'}}  onClick={() => fetch('http://localhost:4545/GFX_reds_OUT/6')}>A3 OUT</Button>
    </Container>
  )
}


export default Reds
