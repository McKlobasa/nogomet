import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import {PlayerContext} from '../context/PlayerContext'
import SidePanel from './SidePanel'
import Middle from './Middle'
import Footer from './Footer'
import Header from './Header'

const Grid = styled.div`
  height: 120vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 15vh 85vh auto;
  grid-template-areas:
    "header header header"
    "left   middle right"
    "footer footer footer";
  box-sizing: border-box;
  padding: 10px;
  overflow-y: scroll;
  background: linear-gradient(
    200.96deg,
    #fedc2a -29.09%,
    #086d19 51.77%,
    #001531 129.35%
  );
  font-family: sans-serif;
  color: white;
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

const MainGrid = (props) => {
  const [isTeamA, setIsTeamA] = useState(0)
  const [isChosenA, setIsChosenA] = useState(0)
  const [isChosenB, setIsChosenB] = useState(0)
  const [hackIter, setHackIter] = useState(false)
  const [players, setPlayers] = useContext(PlayerContext)

  const handleGoal = () => {
    console.log('GOOOOOAL')
    const eventObject = {
      type: isTeamA == 0 ? 'goalA' : 'goalB',
      payload: isTeamA == 0 ? isChosenA : isChosenB
    }
    setPlayers(eventObject)
    setHackIter(!hackIter)
  }

  useEffect(() => console.log(players), [players])


  useEffect(() => {
    const player = players[isTeamA][ isTeamA ? isChosenB : isChosenA]
    const output = {
      number: player.st,
      surname: player.priimek,
      isTeamA,
      goalsBefore: player.goliskupaj,
      goals: player.goliigra,
      matches: player.tekme
    }
    console.log(player)
    postData('currentPlayer', output)
  }, [players, isChosenA, isChosenB, isTeamA])
  return (
    <Grid>
      <SidePanel isChosen={isChosenA} setIsChosen={setIsChosenA} setThisTeam={() => setIsTeamA(0)} isTeamA={true} />
      <SidePanel isChosen={isChosenB} setIsChosen={setIsChosenB} setThisTeam={() => setIsTeamA(1)} isTeamA={false} />
      <Header />
      <Footer />
      <Middle isTeamA={isTeamA} handleGoal={handleGoal} />
    </Grid>
  )
}

export default MainGrid
