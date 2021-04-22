import React, {useReducer, createContext} from 'react'
import Player from '../Player'

const PlayerContext = createContext()
const playersInit = Array(2).fill(Array(10).fill(Player('404','Uvozi', 'Lineup', 0, 0)))


const PlayerContextProvider = ({children}) => {
  return (
    <PlayerContext.Provider value={playersInit}>
      {children}
    </PlayerContext.Provider>
  )
}

export {PlayerContext, PlayerContextProvider}
