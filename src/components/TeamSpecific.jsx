import React from 'react'
import styled from 'styled-components'
import Button from './mini_components/Button'

const TeamSpecific = props => {
  const lineup = variation => {
    if (props.isTeamA) return fetch(`http://localhost:4545/GFX_lineupA/${variation}`)
    return fetch(`http://localhost:4545/GFX_lineupB/${variation}`)
  }
  const coach = () => {
    if (props.isTeamA) return fetch('http://localhost:4545/GFX_coach/0')
    return fetch('http://localhost:4545/GFX_coach/1')
  }
  const timeout = () => {
    if (props.isTeamA) return fetch('http://localhost:4545/GFX_timeout/0')
    return fetch('http://localhost:4545/GFX_timeout/1')
  }
  return (
    <>
      <Button onClick={() => lineup("343")}  >343</Button>
      <Button onClick={() => lineup("352")}  >352</Button>
      <Button onClick={() => lineup("433")}  >433</Button>
      <Button onClick={() => lineup("442")}  >442</Button>
      <Button onClick={() => lineup("451")}  >451</Button>
      <Button onClick={() => lineup("541")}  >541</Button>
      <Button onClick={() => lineup("4321")} >4321</Button>
      <Button onClick={coach}>coach</Button>
      <Button onClick={timeout}>timeout</Button>
    </>
  )
}

export default TeamSpecific
