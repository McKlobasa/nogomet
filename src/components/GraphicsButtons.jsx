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
      <Button onClick={() => fetch('http://localhost:4545/GFX_subs')}>SUBS</Button>
      <Button onClick={() => fetch('http://localhost:4545/matchscore00')}>MATCH SCORE 00</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_endToEnd')}>END TO END</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_preMulti')}>PRE MULTI</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_game_id')}>GAME ID</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_weather')}>WEATHER</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_referees')}>REFEREES</Button>
      <br />
      <Button onClick={() => fetch('http://localhost:4545/delayed_match/delayed')}>cont delay</Button>
      <Button onClick={() => fetch('http://localhost:4545/delayed_match/suspended')}>cont suspended</Button>
      <Button onClick={() => fetch('http://localhost:4545/delayed_match/abandoned')}>cont abandoned</Button>
      <Button onClick={() => fetch('http://localhost:4545/delayed_match/postponed')}>cont postponed</Button>
      <Button onClick={() => fetch('http://localhost:4545/delayed_match/weather')}>cont weather</Button>
      <br />
      <Button onClick={playStatistics}>statistics</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/goals')}>player goals</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/shots')}>player shots</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/attempts')}>player attempts</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/fouls')}>player fouls</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/nameOnly')}>player ID</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/goalScorer')}>goal scorer</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_playerSig/ownGoal')}>own goal</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_yellow')}>rumen</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_double_yellow')}>double rumen</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_red')}>rdec</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_offsides')}>offsides</Button>
      <Button onClick={() => fetch('http://localhost:4545/GFX_ballPoss')}>ball Poss</Button>
    </Container>
  )
}


export default GraphicsButtons
