import React, { useContext, useEffect, useState } from 'react'
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

const incrementTime = time => {
  if (time.sec < 59) return {...time, sec: time.sec + 1}
  return { min: time.min + 1, sec: 0  }
}
const decrementTime = time => {
  if (time.sec > 0) return {...time, sec: time.sec - 1}
  return { min: time.min - 1, sec: 59  }
}


const Clock = props => {
  const [clockIsRunning, setClockIsRunning] = useState(false)
  const [gameTime, setGameTime] = useState({min: 44, sec: 0})
  const [extraTime, setExtraTime] = useState({min: 0, sec: 0})


  const handleTick = () => {
    if ( !clockIsRunning ) return
    if (gameTime.min >= 45) return setExtraTime(incrementTime(extraTime))
    setGameTime(incrementTime(gameTime))
  }

  useEffect(() => console.log(gameTime), [gameTime])

  useInterval(() => {
    handleTick()
  }, 999)

  
  return (
    <Container>
      <p>{`${gameTime.min} : ${gameTime.sec}`}</p>
      <p>{`${extraTime.min} : ${extraTime.sec}`}</p>
      <button onClick={() =>  clockIsRunning ? setClockIsRunning(false) : setClockIsRunning(true)
      }>{clockIsRunning ? 'stop' : 'start'}</button>
      <button onClick={() => setGameTime(incrementTime(gameTime)) }>+</button>
      <button onClick={() => setGameTime(decrementTime(gameTime)) }>-</button>
      <button onClick={() => {
        setGameTime({min: 0, sec: 0}) 
        setExtraTime({min: 0, sec: 0}) 
      }}>reset</button>
    </Container>
  )
}

export default Clock
