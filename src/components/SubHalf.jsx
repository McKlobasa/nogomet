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
  height: 250px;
  width: 200px;;
  margin: 3px;
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
  const [goesInNumber, setGoesInNumber] = useState('10')
  const [goesInName, setGoesInName] = useState('Niko')
  const [goesInSurname, setGoesInSurname] = useState('Notric')
  const [goesOutNumber, setGoesOutNumber] = useState('11')
  const [goesOutName, setGoesOutName] = useState('VEDRAN')
  const [goesOutSurname, setGoesOutSurname] = useState('VEN')
  const [country, setCountry] = useState('MALTA')


  return (
    <Container>
      <InputOut style={{width: 30}}  value={goesOutNumber} onChange={ evt => setGoesOutNumber(evt.target.value) } />
      <InputOut style={{width: 100}} value={goesOutName} onChange={ evt => setGoesOutName(evt.target.value) } />
      <InputOut style={{width: 100}} value={goesOutSurname} onChange={ evt => setGoesOutSurname(evt.target.value) } />
      <InputIn  style={{width: 100}} value={goesInNumber} onChange={ evt => setGoesInNumber(evt.target.value) } />
      <InputIn  style={{width: 100}} value={goesInName} onChange={ evt => setGoesInName(evt.target.value) } />
      <InputIn  style={{width: 100}} value={goesInSurname} onChange={ evt => setGoesInSurname(evt.target.value) } />
      <Country onClick={ () => {
        setCountry(country != "MALTA"
          ? "MALTA"
          : "N. IRELAND"
        )}}>{country}</Country>
      <Button  onClick={() => {
        postData("subHalftime", {inPlayer: [goesInNumber, goesInName, goesInSurname], outPlayer: [goesOutNumber, goesOutName, goesOutSurname], country})
      }}>HALFTIME SUB</Button>

    </Container>
  )
}

export default Sub
