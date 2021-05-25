import React, { useContext } from 'react'
import styled from 'styled-components'
import { HalftimeContext } from '../context/HalftimeContext'
import Button from './mini_components/Button'


const Container = styled.div`
  margin: auto;
  height: fit-content;
  width: 200px;
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  background: white;
  color: black;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Display = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
const getString = (time) => {
  switch (time) {
    case 0: return '1'
    case 1: return 'HALF TIME'
    case 2: return '2'
    case 3: return 'EXTRA 1'
    case 4: return 'EXTRA 2'
    case 5: return 'FULL TIME'
    case 6: return 'END OF 2nd HALF'

  }
}

const Halftime = props => {
  const [halftime, dispatch] = useContext(HalftimeContext)
  const next = () => dispatch({type: 'next'})
  const prev = () => dispatch({type: 'prev'})
  return (
    <Container>
      <Button onClick={prev}>{'<'}</Button>
      <Display>{getString(halftime.time)}</Display>
      <Button onClick={next}>{'>'}</Button>
    </Container>
  )
}

export default Halftime
