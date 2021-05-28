import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import useInterval from '../hooks/useInterval'
import postData from './postData'

const Container = styled.div`
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  display: inline-block;
  color: black;
  padding: 10px;
  height: 150px;
  width: 200px;;
`
const Button = styled.button`
  background: green;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 2px;
  display: inline-block;
  :focus {
    outline: none;
  }
`
const Country = styled.button`
  color: black;
  border: 1px solid grey;
  background: white;
  border-radius: 3px;
  margin: 2px;
  display: block;
  :focus {
    outline: none;
  }
`
const InputIn = styled.input`
  display: block;
  border: 1px solid lightgreen;
  margin: 2px;
  border-radius: 5px;
`
const InputOut = styled.input`
  display: block;
  border: 1px solid red;
  margin: 2px;
  border-radius: 5px;
`

const Sub = props => {
  const [goesIn, setGoesIn] = useState('10 Niko Notric')
  const [goesOut, setGoesOut] = useState('10 Ido Ven')
  const [country, setCountry] = useState('MALTA')


  return (
    <Container>
      <InputOut  value={goesOut} onChange={ evt => setGoesOut(evt.target.value) } />
      <InputIn  value={goesIn} onChange={ evt => setGoesIn(evt.target.value) } />
      <Country onClick={ () => {
        setCountry(country == "MALTA"
          ? "N. IRELAND"
          : "MALTA"
        )}}>{country}</Country>
      <Button onClick={() => {
        postData("subClockInStart", {player: goesIn, country})
      }} >notri START</Button>
      <Button onClick={() => fetch("http://localhost:4545/subClockInStop")}>notri STOP</Button>
      <Button onClick={() => {
        postData("subClockOutStart", {player: goesOut, country})
      }} >ven START</Button>
      <Button onClick={() => fetch("http://localhost:4545/subClockOutStop")}>ven STOP</Button>
      <Button>A</Button>
      <Button>A</Button>

    </Container>
  )
}

export default Sub
