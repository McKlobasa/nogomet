import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import useInterval from '../hooks/useInterval'
import postData from './postData'

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  color: black;
  padding: 10px;
  height: 120px;
  width: 150px;
  flex-wrap: wrap;
  margin-left: 15px;
`
const Button = styled.button`
  background: green;
  color: white;
  height: 20px;
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
  const [gameTime, setGameTime] = useState({min: 10, sec: 0})


  const handleTick = () => {
    if ( !clockIsRunning ) return
    setGameTime(decrementTime(gameTime))
  }

  const ensureLeadingZero = number => `${Math.floor(number / 10)}${number % 10}`

  useEffect(() => postData('countdown', {
    countdown: gameTime,
  }), [gameTime])

  useInterval(() => {
    handleTick()
  }, 999)


  return (
    <Container>
      <p style={{margin: 3, width: 110}}>{`${gameTime.min} : ${gameTime.sec}`}</p>
      <Button onClick={() =>  clockIsRunning ? setClockIsRunning(false) : setClockIsRunning(true)
      }>{clockIsRunning ? 'stop' : 'start'}</Button>
      <Button onClick={() => setGameTime(incrementTime(gameTime)) }>+</Button>
      <Button onClick={() => setGameTime(decrementTime(gameTime)) }>-</Button>
      <Button onClick={() => {
        fetch('http://localhost:4545/GFX_countdown_IN')
        postData('countdown', {
          countdown: gameTime,
        })
      }}>IN</Button>
      <Button onClick={() => {
        setGameTime({min: 10, sec: 0})
      }}>10 min</Button>
      <Button onClick={() => {
        setGameTime({min: 5, sec: 0})
      }}>5 min</Button>
      <Button onClick={() => {
        setGameTime({min: 1, sec: 0})
      }}>1 min</Button>
      <Button onClick={() => {
        setGameTime({min: 0, sec: 10})
      }}>10 sec</Button>
    </Container>
  )
}

export default Clock
