import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import useInterval from '../hooks/useInterval'

const Container = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background: white;
  border-radius: 10px;
  color: black;
  padding: 10px;
  height: 100px;
  width: 200px;;
`
const Button = styled.button`
  background: #ff7e94;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 2px;
  :focus {
    outline: none;
  }
`

const Clock = props => {
  return (
    <Container>
    </Container>
  )
}

export default Clock
