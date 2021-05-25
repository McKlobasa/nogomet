import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  height: 100px;
  width: 300px;
  color: black;
  padding: 10px;
  margin: 5px;
  margin-left: 25px;
  position: relative;
  background: white;
  display: grid;
  grid-template-rows: 1fr 1fr;
  border-radius: 15px;
`
const UpperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`
const Buttons = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3px 3px;
`
const GoalButton = styled.div`
  height: 25px;
  width: 25px;
  background: aquamarine;
  border-radius: 50%;
`
const MissButton = styled.div`
  height: 25px;
  width: 25px;
  background: #ff7e94;
  border-radius: 50%;
`
const Button = styled.button`
  margin: 2px;
  border-radius: 5px;
  border: none;
  background: #ff7e94;
  color: white;
  color: whitewhite;
  height: 22px;
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





const Shootout = props => {
  const [score, setScore] = useState([0,0])
  const [stateOfButtons, setStateOfButtons] = useState([[0,0,0,0,0],[0,0,0,0,0]])
  const [bigIsIn, setBigIsIn] = useState(true)

  const givePointToTeam = (prevScore, team) => {
    if (team == 0) return setScore([prevScore[0] + 1, prevScore[1]])
    return setScore([prevScore[0], 1 + prevScore[1]])
  }

  //event number je 0 -> nevtalna, 1 -> zgresil, 2 -> goal
  const changeButtonState = (number, team, eventNumber) => {
    const buttonStateTeam = stateOfButtons[team].map((state, iter) => {
      if (iter != number) return state
      return eventNumber
    })

    if (team == 0) return setStateOfButtons([buttonStateTeam, stateOfButtons[1]])
    return setStateOfButtons([stateOfButtons[0], buttonStateTeam])
  }
  const handleGoal = (number, team) => {
    givePointToTeam(score, team)
    changeButtonState(number, team, 2)

  }
  const handleMissed = (number, team) => {
    changeButtonState(number, team, 1)

  }

  const bigGfxIn = () => {
    setBigIsIn(true)
    const data = {
      score,
      stateOfButtons
    }
    postData('GFX_big_shootout', data)
  }
  const smallGfxIn = () => {
    setBigIsIn(false)
    const data = {
      score,
      stateOfButtons: [stateOfButtons[0][0], stateOfButtons[0][1]]
    }
    postData('GFX_small_shootout', data)
  }
  const updateData = () => {
    const data = {
      score,
      stateOfButtons
    }
    postData('GFX_big_shootout_update', data)
  }
  const updateSmallData = () => {
    const data = {
      score,
      stateOfButtons: [stateOfButtons[0][0], stateOfButtons[1][0]]
    }
    postData('GFX_small_shootout_update', data)
  }

  const onScoreChange = () => {
    console.log(score)
  }
  const resetColor = () => setStateOfButtons([[0,0,0,0,0],[0,0,0,0,0]])

  useEffect(() => {
    console.log(stateOfButtons)
    if (bigIsIn) updateData()
    else updateSmallData()

  }, [stateOfButtons])
  useEffect( onScoreChange, [score])
  return <Container>
    <UpperRow>
      <div style={{padding: 3, fontSize: 25, display: 'flex', alignItems: 'center'}}>{`${score[0]} : ${score[1]}`}</div>
      <Button onClick={resetColor} >reset</Button>
      <Button onClick={bigGfxIn}>GFX_IN</Button>
      <Button onClick={smallGfxIn}>mini gfxIN</Button>
    </UpperRow>
    <Buttons>
      <GoalButton onClick={() => handleGoal(0, 0)}/>
      <GoalButton onClick={() => handleGoal(1, 0)}/>
      <GoalButton onClick={() => handleGoal(2, 0)}/>
      <GoalButton onClick={() => handleGoal(3, 0)}/>
      <GoalButton onClick={() => handleGoal(4, 0)}/>
      <div></div>
      <GoalButton onClick={() => handleGoal(0, 1)}/>
      <GoalButton onClick={() => handleGoal(1, 1)}/>
      <GoalButton onClick={() => handleGoal(2, 1)}/>
      <GoalButton onClick={() => handleGoal(3, 1)}/>
      <GoalButton onClick={() => handleGoal(4, 1)}/>

      <MissButton onClick={() => handleMissed(0, 0)}/>
      <MissButton onClick={() => handleMissed(1, 0)}/>
      <MissButton onClick={() => handleMissed(2, 0)}/>
      <MissButton onClick={() => handleMissed(3, 0)}/>
      <MissButton onClick={() => handleMissed(4, 0)}/>
      <div></div>
      <MissButton onClick={() => handleMissed(0, 1)}/>
      <MissButton onClick={() => handleMissed(1, 1)}/>
      <MissButton onClick={() => handleMissed(2, 1)}/>
      <MissButton onClick={() => handleMissed(3, 1)}/>
      <MissButton onClick={() => handleMissed(4, 1)}/>
    </Buttons>
    </Container>
}

export default Shootout
