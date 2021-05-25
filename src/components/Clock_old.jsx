import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import useInterval from '../hooks/useInterval'

const Container = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background: white;
  border-radius: 10px;
  color: black;
  padding: 10px;
  height: 100px;
  width: 200px;;
`

const MainTime = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`
const Izk1 = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`
const Izk2 = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
`
const Izk3 = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
`
const Izk4 = styled.div`
  grid-column: 3/4;
  grid-row: 3/4;
`

const Button = styled.button`
  background: #ff7e94;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 2px;
  :focus {
    outline: none;
  }
`

const Clock = props => {
  const [clock, setClock] = useState({clock: ['','','','','','']})
  const [isIn1, setIsIn1] = useState(false)
  const [isIn2, setIsIn2] = useState(false)
  const [isIn3, setIsIn3] = useState(false)
  const [isIn4, setIsIn4] = useState(false)
  const [time] = useContext(HalftimeContext)

  const getClock = () => {
    fetch('http://localhost:4545/clock')
      .then(res => res.json())
      .then(data => setClock(data))
  }
  useInterval(getClock, 100)
  return (
    <Container>
      <MainTime>{clock.clock[0]}</MainTime>
      <Button onClick={() => fetch(`http://localhost:4545/GFX_clock_IN/${time.time < 2 ? 0 : 1}`)}>IN</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_clock_OUT')}>OUT</Button>
      <div></div>
      <div>{clock.clock[1]}</div>
      <Button onClick={() => {
        if (isIn1) fetch('http://localhost:4545/GFX_izk1_OUT')
        else fetch('http://localhost:4545/GFX_izk1_IN')
        setIsIn1(!isIn1)
      }} >{isIn1 ? 'OUT' : 'IN'}</Button>
      <div>{clock.clock[4]}</div>
      <Button onClick={() => {
        if (isIn2) fetch('http://localhost:4545/GFX_izk3_OUT')
        else fetch('http://localhost:4545/GFX_izk3_IN')
        setIsIn2(!isIn2)
      }} >{isIn2 ? 'OUT' : 'IN'}</Button>
      <div>{clock.clock[2]}</div>
      <Button onClick={() => {
        if (isIn3) fetch('http://localhost:4545/GFX_izk2_OUT')
        else fetch('http://localhost:4545/GFX_izk2_IN')
        setIsIn3(!isIn3)
      }} >{isIn3 ? 'OUT' : 'IN'}</Button>
      <div>{clock.clock[5]}</div>
      <Button onClick={() => {
        if (isIn4) fetch('http://localhost:4545/GFX_izk4_OUT')
        else fetch('http://localhost:4545/GFX_izk4_IN')
        setIsIn4(!isIn4)
      }} >{isIn4 ? 'OUT' : 'IN'}</Button>
    </Container>
  )
}

export default Clock
