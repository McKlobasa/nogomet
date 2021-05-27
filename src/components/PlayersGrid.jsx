import { UpdaterSignal } from 'electron-updater'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlayerContext, PlayerContextProvider } from '../context/PlayerContext'


const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0px;
  overflow: hidden;
  border-radius: 10px;
`
const PlayerRow = styled.button`
  box-sizing: border-box;
  height: 22px;
  width: 100%;
  text-align: left;
  font-size: 14px;
  padding: 2px;
  border: none;
  background: ${ props => props.isChosen ? 'lightgreen' : 'white' };
  position:relative;
  border-top: 1px solid lightgreen;
  user-select: text;

  :focus {
    outline: none;
  }
`

const UpdateButton = styled.button`
  width: 100%;
  height: fit-content;
  border: none;
  background: #003d17;
  color: white;

  :focus {
    outline: none;
  }
`
const Position = styled.input `
  width: 40px;
  height: 10px;
  margin-left: 10px;
  border: 1px solid lightgreen;
`

const PlayersGrid = ( props ) => {
  const [players, dispatch] = useContext(PlayerContext)
  const [tactical, setTactical] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])



  useEffect(() => console.log(players), [players])
  const update = () => {
    if (props.isTeamA) return fetch('http://localhost:4545/lineupA')
    .then(res=> res.json())
    .then(data => dispatch({type: 'updateA', payload: data.team}));

    return fetch('http://localhost:4545/lineupB')
    .then(res=> res.json())
    .then(data => dispatch({type: 'updateB', payload: data.team}))
  }

  const handleSelect = number => {
    props.setIsChosen(number)
    props.setThisTeam()
  }

  const handleTacticalChange = ( positionInLineup, positionOnTactical ) => {
    let temp = [...tactical]
    temp[positionInLineup] = positionOnTactical
    setTactical(temp)
  }

  return (
    <Container>
      <UpdateButton onClick={update}>UPDATE</UpdateButton>
      {
        players[props.isTeamA ? 0 : 1]?.map?.((player, iter) => <PlayerRow
            key={iter}
            onClick={() => handleSelect(iter)}
            isChosen={props.isChosen == iter}
          >{`${player?.st}  ${player?.priimek}`}
          <div style={{position: 'absolute', right: 5, top: 3}}>
            {`fouls: ${player?.fouls}  --  ${player?.attempts} ${player?.shots} ${player?.goals}`}
            <Position type={"number"} value={tactical[iter]} onChange={ evt => handleTacticalChange(iter, evt.target.value) } />
          </div>
        </PlayerRow>)
      }
    </Container>
  )
}

export default PlayersGrid
