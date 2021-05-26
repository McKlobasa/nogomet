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
      <p>game data</p>
      <FileSelector endpoint={'gameData'} defaultPath={'C:\\Users\\kllam\\Desktop\\futsal\\matchData.csv'}/>
      <p>clock</p>
      <FileSelector endpoint={'clock'} defaultPath={'C:\\Users\\kllam\\Desktop\\Clock.txt'}/>
    </div>
  )
}


export default Imports
