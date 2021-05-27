import React from 'react'
import styled from 'styled-components'
import PlayersGrid from './PlayersGrid'
import TeamSpecific from './TeamSpecific'

const Container = styled.div`
  box-sizing: border-box;
  grid-area: ${ props => props.isTeamA ? 'left' : 'right' };
  padding: 13px;

`

const SidePanel = (props) => {
  return (
    <Container isTeamA={props.isTeamA}>
      <PlayersGrid isChosen={props.isChosen} setIsChosen={props.setIsChosen} isTeamA={props.isTeamA}  setThisTeam={props.setThisTeam} />
      <TeamSpecific isTeamA={props.isTeamA} />
    </Container>
  )
}

export default SidePanel
