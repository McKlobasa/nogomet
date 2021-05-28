import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import { StatisticsContext } from '../context/StatisticsContext'

const Input = styled.input`
  height: 16px;
  width: 100%;
  border: 1px solid lightgreen;
  margin: 0px;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 3fr 2fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;
`
const Button = styled.button`
  height: 20px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgreen;
  border:none;
  &:hover {
    background: green;
  }
  &:active {
    color: white;
  }
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



const Shooters = props => {
  const [shooter01, setShooter01] = useState('')
  const [shooter02, setShooter02] = useState('')
  const [shooter03, setShooter03] = useState('')
  const [shooter04, setShooter04] = useState('')
  const [shooter05, setShooter05] = useState('')
  const [shooter06, setShooter06] = useState('')
  const [shooter07, setShooter07] = useState('')
  const [shooter08, setShooter08] = useState('')
  const [shooter09, setShooter09] = useState('')
  const [shooter10, setShooter10] = useState('')
  const [shooter11, setShooter11] = useState('')
  const [shooter12, setShooter12] = useState('')
  const [shooter13, setShooter13] = useState('')
  const [shooter14, setShooter14] = useState('')

  const [time01, setTime01] = useState('')
  const [time02, setTime02] = useState('')
  const [time03, setTime03] = useState('')
  const [time04, setTime04] = useState('')
  const [time05, setTime05] = useState('')
  const [time06, setTime06] = useState('')
  const [time07, setTime07] = useState('')
  const [time08, setTime08] = useState('')
  const [time09, setTime09] = useState('')
  const [time10, setTime10] = useState('')
  const [time11, setTime11] = useState('')
  const [time12, setTime12] = useState('')
  const [time13, setTime13] = useState('')
  const [time14, setTime14] = useState('')

  const [time, setTime] = useContext(HalftimeContext)
  const [stats, setStats] = useContext(StatisticsContext)

  const handleClick = (size) => {
    let timeString
    if (time.time == 0 || time.time == 2) timeString = 'ROW'
    else timeString = 'HT_FT'

    let period = ''
    switch (Number(time.time)) {
      case 0: period='HALF-TIME'
        break
      case 1: period='HALF-TIME'
        break
      case 2: period='HALF-TIME'
        break
      case 3: period='HALF-TIME'
        break
      case 4: period='HALF-TIME'
        break
      case 5: period='FULL-TIME'
        break
      case 6: period='END OF 2nd HALF'
        break
    }

    const scene = `MATCH_SCORE_${size}`


    postData('GFX_matchScore', {
      size,
      scene,
      period,
      score: `${stats.goals[0]}-${stats.goals[1]}`,
      shooters: [
        shooter01,
        shooter02,
        shooter03,
        shooter04,
        shooter05,
        shooter06,
        shooter07,
        shooter08,
        shooter09,
        shooter10,
        shooter11,
        shooter12,
        shooter13,
        shooter14,
      ],
      times: [
        time01,
        time02,
        time03,
        time04,
        time05,
        time06,
        time07,
        time08,
        time09,
        time10,
        time11,
        time12,
        time13,
        time14
      ]
  })
  }
  return (
    <Container>
      <Input onChange={evt => setShooter01(evt.target.value)} value={shooter01} />
      <Input onChange={evt => setTime01(evt.target.value)} value={time01} />
      <Button onClick={() =>handleClick("01")} >1</Button>
      <Input onChange={evt => setShooter02(evt.target.value)} value={shooter02} />
      <Input onChange={evt => setTime02(evt.target.value)} value={time02} />
      <Input onChange={evt => setShooter03(evt.target.value)} value={shooter03} />
      <Input onChange={evt => setTime03(evt.target.value)} value={time03} />
      <Button onClick={() =>handleClick("02")} >2</Button>
      <Input onChange={evt => setShooter04(evt.target.value)} value={shooter04} />
      <Input onChange={evt => setTime04(evt.target.value)} value={time04} />
      <Input onChange={evt => setShooter05(evt.target.value)} value={shooter05} />
      <Input onChange={evt => setTime05(evt.target.value)} value={time05} />
      <Button onClick={() =>handleClick("03")} >3</Button>
      <Input onChange={evt => setShooter06(evt.target.value)} value={shooter06} />
      <Input onChange={evt => setTime06(evt.target.value)} value={time06} />
      <Input onChange={evt => setShooter07(evt.target.value)} value={shooter07} />
      <Input onChange={evt => setTime07(evt.target.value)} value={time07} />
      <Button onClick={() =>handleClick("04")} >4</Button>
      <Input onChange={evt => setShooter08(evt.target.value)} value={shooter08} />
      <Input onChange={evt => setTime08(evt.target.value)} value={time08} />
      <Input onChange={evt => setShooter09(evt.target.value)} value={shooter09} />
      <Input onChange={evt => setTime09(evt.target.value)} value={time09} />
      <Button onClick={() =>handleClick("05")} >5</Button>
      <Input onChange={evt => setShooter10(evt.target.value)} value={shooter10} />
      <Input onChange={evt => setTime10(evt.target.value)} value={time10} />
      <Input onChange={evt => setShooter11(evt.target.value)} value={shooter11} />
      <Input onChange={evt => setTime11(evt.target.value)} value={time11} />
      <Button onClick={() =>handleClick("06")} >6</Button>
      <Input onChange={evt => setShooter12(evt.target.value)} value={shooter12} />
      <Input onChange={evt => setTime12(evt.target.value)} value={time12} />
      <Input onChange={evt => setShooter13(evt.target.value)} value={shooter13} />
      <Input onChange={evt => setTime13(evt.target.value)} value={time13} />
      <Button onClick={() =>handleClick("07")} >7</Button>
      <Input onChange={evt => setShooter14(evt.target.value)} value={shooter14} />
      <Input onChange={evt => setTime14(evt.target.value)} value={time14} />
    </Container>
  )
}

export default Shooters
