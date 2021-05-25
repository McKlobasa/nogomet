import { time } from 'console'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import { StatisticsContext } from '../context/StatisticsContext'
import Button from './mini_components/Button'

const Container = styled.div`
  margin: auto;
  margin-top: 20px;

  width: fit-content;
`

const postData = (endpoint, data) => {
  try {
    fetch(`http://localhost:4545/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
  } catch (err) {
    console.log(err)
  }
}

const GraphicsButtons = props => {
  const [statistics, setStatistics] = useContext(StatisticsContext)
  const [time, setTime] = useContext(HalftimeContext)

  const playStatistics = () => {
    const body = {...statistics, time: time.time < 2 ? 'HALFTIME' : 'FINAL'}
    postData('statistics', body)
  }
  return (
    <Container>
      <Button onClick={() => fetch('http://localhost:4545/GFX_countdown')}>COUNTDOWN</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_game_id')}>GAME ID</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_commentator')}>KOMENTATOR</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_officials')}>OFFICIALS</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_schedule')}>SCHEDULE</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_nextMatch')}>NEXT MATCH</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_multi_flash')}>MULTI FLASH</Button>
      <Button onClick={() => fetch('http://localhost:4545/resetFouls')}>RESET FOULS</Button>

      <Button onClick={playStatistics}>statistics</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_player')}>player</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_player_info')}>player INFO</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_yellow')}>rumen</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_double_yellow')}>double rumen</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_red')}>rdec</Button>
      <Button onClick={() => fetch('http://localhost:4545/')}>match score</Button>
      <Button onClick={() => fetch('http://localhost:4545/')}>penalty shootout</Button>
    </Container>
  )
}


export default GraphicsButtons
