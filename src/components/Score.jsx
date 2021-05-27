import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import {StatisticsContext} from '../context/StatisticsContext'

const Container = styled.div`
  width: 300px;
  height: 100px;
  margin: auto;
  margin-bottom :15px;
  overflow: hidden;

  border-radius: 15px;

  display: grid;
  grid-template-columns: 50% 50%;
`

const NumberInput = styled.div`
  color: black;
  font-size: 40px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`

const Score = props => {
  const [stats, setStats] = useContext(StatisticsContext)
  useEffect(() => {
    fetch(`http://localhost:4545/score/${stats.goals[0]}/${stats.goals[1]}`)
  }, [stats])
  return (
    <Container>
      <NumberInput>{stats.goals[0]}</NumberInput>
      <NumberInput>{stats.goals[1]}</NumberInput>
    </Container>
  )
}


export default Score
