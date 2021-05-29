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
  height: 100px;
  width: 300px;
  flex-wrap: wrap;
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
  const [gameTime, setGameTime] = useState({min: 0, sec: 0})
  const [extraTime, setExtraTime] = useState({min: 0, sec: 0})
  const [extraTimeIsIn, setExtraTimeIsIn] = useState(false)
  const [extraMins, setExtraMins] = useState(0)


  const handleTick = () => {
    if ( !clockIsRunning ) return
    if (gameTime.min >= 45) {
      setExtraTimeIsIn(true)
      return setExtraTime(incrementTime(extraTime))
    }
    setGameTime(incrementTime(gameTime))
    setExtraTimeIsIn(false)
  }

  const ensureLeadingZero = number => `${Math.floor(number / 10)}${number % 10}`

  useEffect(() => postData('clock', {
    gameTime,
    extraTime,
    extraTimeIsIn,
    extraMins
  }), [extraMins, gameTime, extraTime, extraTimeIsIn])

  useInterval(() => {
    handleTick()
  }, 999)


  return (
    <Container>
      <p style={{margin: 3, width: 110}}>{`${gameTime.min} : ${gameTime.sec}`}</p>
      <p style={{margin: 3, width: 110}}>{`${extraTime.min} : ${extraTime.sec}`}</p>
      <input  style={{width: 30}} value={extraMins} onChange={e => setExtraMins(e.target.value)} type={"number"} />
      <Button onClick={() =>  clockIsRunning ? setClockIsRunning(false) : setClockIsRunning(true)
      }>{clockIsRunning ? 'stop' : 'start'}</Button>
      <Button onClick={() => setGameTime(incrementTime(gameTime)) }>+</Button>
      <Button onClick={() => setGameTime(decrementTime(gameTime)) }>-</Button>
      <Button onClick={() => {
        fetch('http://localhost:4545/GFX_clock_IN')
        postData('clock', {
          gameTime,
          extraTime,
          extraTimeIsIn,
          extraMins
        })
      }}>IN</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_clock_OUT') }>OUT</Button>
      <Button onClick={() => {
        setGameTime({min: 0, sec: 0})
        setExtraTime({min: 0, sec: 0})
      }}>reset</Button>
      <Button onClick={() => {
        setGameTime({min: 44, sec: 45})
        setExtraTime({min: 0, sec: 0})
      }}>set 44:45</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_extraRunning') }>extra IN</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_extraRunning_OUT') }>extra OUT</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_extra') }>extra MIN</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_extra_OUT') }>extra MIN OUT</Button>
    </Container>
  )
}

export default Clock
