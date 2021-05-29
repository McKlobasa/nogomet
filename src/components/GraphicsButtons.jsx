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
      <Button onClick={() => fetch('http://localhost:4545/GFX_game_id')}>GAME ID</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_commentator')}>KOMENTATOR</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_officials')}>OFFICIALS</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_subs')}>SUBS</Button>
      <Button onClick={() => fetch('http://localhost:4545/matchscore00')}>MATCH SCORE 00</Button>
      <br />
      <br />
      <Button onClick={playStatistics}>statistics</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/goals')}>player goals</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/shots')}>player shots</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/attempts')}>player attempts</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/fouls')}>player fouls</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/nameOnly')}>player ID</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_yellow')}>rumen</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_double_yellow')}>double rumen</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_red')}>rdec</Button>
    </Container>
  )
}


export default GraphicsButtons
