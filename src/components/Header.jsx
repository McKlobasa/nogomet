import React from 'react'
import styled from 'styled-components'
import BallPossesion from './BallPossesion'
import Clock from './Clock'
import Button from './mini_components/Button'
import Score from './Score'
import Shootout from './Shootout'

const Container = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 2fr 0.2fr;
`

const Header = props => {
  return (
    <Container>
      <Clock />
      <div />
      <Score />
      <div></div>
      <Button onClick={() => fetch('http://localhost:4545/GFX_out')}/>
    </Container>
  )
}


export default Header
