import React, {useContext} from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import {StatisticsContext} from '../context/StatisticsContext'


const Container = styled.div`
height: 122px;
width: 384px;
margin: auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr;

`
const Button = styled.button`
font-size: 30px;
height: 50px;
width: 90px;
background: white;
border: none;
border-radius: 20px;
margin: 4px;
padding: 5px;
:focus {
  outline: none;
}
`

const StatisticsButtons = ( props ) => {
  const [stats, setStats] = useContext(StatisticsContext)
  const [time, setTime] = useContext(HalftimeContext)

  const handleGoal = () => {
    setStats({type: 'goal', team: props.isTeamA})
    setStats({type: 'shot', team: props.isTeamA})
    setStats({type: 'attempt', team: props.isTeamA})
    props.handleGoal(['goalA', 'goalB'])
    props.handleGoal(['shotA', 'shotB'])
    props.handleGoal(['attemptA', 'attemptB'])
  }
  const handleShot = () => {
    setStats({type: 'shot', team: props.isTeamA})
    setStats({type: 'attempt', team: props.isTeamA})
    props.handleGoal(['shotA', 'shotB'])
    props.handleGoal(['attemptA', 'attemptB'])
  }
  const handleAttempt = () => {
    setStats({type: 'attempt', team: props.isTeamA})
    props.handleGoal(['attemptA', 'attemptB'])
  }
  const handleCorner = () => {
    setStats({type: 'corner', team: props.isTeamA})
  }
  const handleOffside = () => {
    setStats({type: 'offside', team: props.isTeamA})
  }
  const handleFoul = () => {
    console.log(time)
    let foulsInHalf
    if (props.isTeamA == 0) {
      foulsInHalf = [stats.fouls[0][time.time < 2 ? 0 : 1] + 1, stats.fouls[1][time.time < 2 ? 0 : 1]]
    } else {
      foulsInHalf = [stats.fouls[0][time.time < 2 ? 0 : 1], stats.fouls[1][time.time < 2 ? 0 : 1] + 1]
    }

    if (time.time < 2) return setStats({type: 'foulFirst', team: props.isTeamA})
    return setStats({type: 'foulSecond', team: props.isTeamA})
  }
  const handleYellow = () => {
    if (time.time < 2) return setStats({type: 'yellowFirst', team: props.isTeamA})
    return setStats({type: 'yellowSecond', team: props.isTeamA})
  }
  const handleRed = () => {
    if (time.time < 2) return setStats({type: 'redFirst', team: props.isTeamA})
    return setStats({type: 'redSecond', team: props.isTeamA})
  }
  const takeAwayGoal = () => {
    setStats({type: 'goalTakeAway', team: props.isTeamA})
    setStats({type: 'shotTakeAway', team: props.isTeamA})
    setStats({type: 'attemptTakeAway', team: props.isTeamA})
  }
  const takeAwayShot = () => {
    setStats({type: 'shotTakeAway', team: props.isTeamA})
    setStats({type: 'attemptTakeAway', team: props.isTeamA})
  }
  const takeAwayAttempt = () => {
    setStats({type: 'attemptTakeAway', team: props.isTeamA})
  }
  const takeAwayCorner = () => {
    setStats({type: 'cornerTakeAway', team: props.isTeamA})
  }
  const takeAwayOffside = () => {
    setStats({type: 'offsideTakeAway', team: props.isTeamA})
  }
  const takeAwayFoul = () => {
    if (time.time < 2) return setStats({type: 'foulTakeAwayFirst', team: props.isTeamA})
    return setStats({type: 'foulTakeAwaySecond', team: props.isTeamA})
  }
  const takeAwayYellow = () => {
    if (time.time < 2) return setStats({type: 'yellowTakeAwayFirst', team: props.isTeamA})
    return setStats({type: 'yellowTakeAwaySecond', team: props.isTeamA})
  }
  const takeAwayRed = () => {
    if (time < 2) return setStats({type: 'redTakeAwayFirst', team: props.isTeamA})
    return setStats({type: 'redTakeAwaySecond', team: props.isTeamA})
  }
  return (
    <Container>
      <Button onClick={handleGoal}    onContextMenu={takeAwayGoal}    >⚽</Button>
      <Button onClick={handleShot}    onContextMenu={takeAwayShot}    >🥅</Button>
      <Button onClick={handleAttempt} onContextMenu={takeAwayAttempt} >🚀</Button>
      <Button onClick={handleCorner}  onContextMenu={takeAwayCorner}  >┍</Button>
      <Button onClick={handleFoul}    onContextMenu={takeAwayFoul}    >🚑</Button>
      <Button onClick={handleYellow}  onContextMenu={takeAwayYellow}  >🟡</Button>
      <Button onClick={handleRed}     onContextMenu={takeAwayRed}     >🔴</Button>
      <Button onClick={handleOffside} onContextMenu={takeAwayOffside} >OFF</Button>
    </Container>
  )
}

export default StatisticsButtons
