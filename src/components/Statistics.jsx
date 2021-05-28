import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import {StatisticsContext} from '../context/StatisticsContext'
import postData from './postData'


const StatDisplay = styled.div`
  height: 20px;
  width: 40px;
  border:none;
  border-radius: 13px;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
  font-size: 12px;
`
const StatInput = styled.input`
  height: 22px;
  width: 42px;
  border:none;
  border-radius: 13px;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 5px;
`
const Container = styled.div`
  width: 80%;
  height: 130px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  `

const StatName = styled.div`
  border:none;
  height: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
`



const Statistics = props => {
  const [stats, setStats] = useContext(StatisticsContext)
  const [writtenStats, setWrittenStats] = useState({
    ballPoss:  [0,0],
    passed:    [0,0],
    completed: [0,0]
  })

  const changeOneStat = (key, team = 0, value = 0) => setWrittenStats({ ...writtenStats, [key]: team === 0 ? [value, writtenStats[key][1]] : [writtenStats[key][0], value] })

  useEffect(() => postData("stats" , {...stats, ...writtenStats}), [stats, writtenStats])


  return (
    <Container>

      <StatDisplay>{stats.attempts[0]}</StatDisplay>
      <StatName>POSKUSI🚀</StatName>
      <StatDisplay>{stats.attempts[1]}</StatDisplay>

      <div></div>

      <StatDisplay>{stats.yellows[0][0] + '/' + stats.yellows[0][1]}</StatDisplay>
      <StatName>RUMENI🟡</StatName>
      <StatDisplay>{stats.yellows[1][0] + '/' + stats.yellows[1][1]}</StatDisplay>

      <StatDisplay>{stats.shots[0]}</StatDisplay>
      <StatName>STRELI🥅</StatName>
      <StatDisplay>{stats.shots[1]}</StatDisplay>

      <div></div>

      <StatDisplay>{stats.reds[0][0] + '/' + stats.reds[0][1]}</StatDisplay>
      <StatName>RDECI🔴</StatName>
      <StatDisplay>{stats.reds[1][0] + '/' + stats.reds[1][1]}</StatDisplay>

      <StatDisplay>{stats.fouls[0][0] + '/' + stats.fouls[0][1]}</StatDisplay>
      <StatName>FOULI🚑</StatName>
      <StatDisplay>{stats.fouls[1][0] + '/' + stats.fouls[1][1]}</StatDisplay>

      <div></div>

      <StatInput type={"number"} value={writtenStats.ballPoss[0]} onChange={ evt => changeOneStat('ballPoss', 0, evt.target.value) } />
      <StatName>BALL POSS</StatName>
      <StatInput type={"number"} value={writtenStats.ballPoss[1]} onChange={ evt => changeOneStat('ballPoss', 1, evt.target.value) } />

      <StatDisplay>{stats.corners[0]}</StatDisplay>
      <StatName>CORNERS┍</StatName>
      <StatDisplay>{stats.corners[1]}</StatDisplay>

      <div></div>

      <StatInput type={"number"} value={writtenStats.passed[0]} onChange={ evt => changeOneStat('passed', 0, evt.target.value) } />
      <StatName>PASSES</StatName>
      <StatInput type={"number"} value={writtenStats.passed[1]} onChange={ evt => changeOneStat('passed', 1, evt.target.value) } />

      <StatDisplay>{stats.offsides[0]}</StatDisplay>
      <StatName>OFFSIDES</StatName>
      <StatDisplay>{stats.offsides[1]}</StatDisplay>

      <div></div>

      <StatInput type={"number"} value={writtenStats.completed[0]} onChange={ evt => changeOneStat('completed', 0, evt.target.value) } />
      <StatName>COMPLETED</StatName>
      <StatInput type={"number"} value={writtenStats.completed[1]} onChange={ evt => changeOneStat('completed', 1, evt.target.value) } />

    </Container>
  )
}

export default Statistics
