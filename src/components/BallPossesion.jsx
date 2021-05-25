import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 80px;
  width: 150px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: 15px;
  background: white;
`
const Input = styled.input`
  width: 40px;
  height: 40px;
  margin: auto;
  border: none;
`
const Button = styled.button`
  grid-column: 1/3;
  grid-row: 2/3;
  border: none;
  background: #00f05c;
`

const BallPossesion = props => {
  const [ballPoss1, setBallPoss1] = useState(0)
  const [ballPoss2, setBallPoss2] = useState(0)
  const handleClick = () => {
    fetch(`http://localhost:4545/GFX_ball_possesion/${ballPoss1}/${ballPoss2}`)
  }
  return (
    <Container>
      <Input type={'number'} value={ballPoss1} onChange={evt => setBallPoss1(evt.target.value)} />
      <Input type={'number'} value={ballPoss2} onChange={evt => setBallPoss2(evt.target.value)} />
      <Button onClick={ handleClick } >BALL POSSESION</Button>
    </Container>
  )
}

export default BallPossesion
