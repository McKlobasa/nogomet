import React from 'react'
import styled from 'styled-components'
import FileSelector from './FileSelector'

const Imports  = props => {
  return (
    <div>
      <p>lineup A</p>
      <FileSelector endpoint={'lineupA'} defaultPath={'C:\\Users\\kllam\\Desktop\\futsal\\teamA.csv'}/>
      <p>lineup B</p>
      <FileSelector endpoint={'lineupB'} defaultPath={'C:\\Users\\kllam\\Desktop\\futsal\\teamB.csv'}/>
    </div>
  )
}


export default Imports
