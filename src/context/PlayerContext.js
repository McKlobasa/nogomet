import React, {useReducer, createContext} from 'react'
import Player from '../Player'

const PlayerContext = createContext()
const playersInit = Array(2).fill(Array(10).fill({st: 0, priimek: 'Priimković', attempts: 0, shots: 0, goals: 0 }))
const statIncrement = (team, numberLineup, key) => {
  const output = team.map((player, iter) => {
    if (iter != numberLineup) return player
    return { ...player, [key]: Number(player[key]) + 1 }
  })
  console.log(output)
  return output
}

const playerReducer = (state, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'updateA':  return [ action.payload, state[1] ]
    case 'updateB':  return [ state[0], action.payload ]
    case 'attemptA': return [ statIncrement(state[0], action.payload, "attempts"), state[1] ]
    case 'attemptB': return [ state[0], statIncrement(state[1], action.payload, "attempts") ]
    case 'shotA':    return [ statIncrement(state[0], action.payload, "shots"), state[1] ]
    case 'shotB':    return [ state[0], statIncrement(state[1], action.payload, "shots") ]
    case 'goalA':    return [ statIncrement(state[0], action.payload, "goals"), state[1] ]
    case 'goalB':    return [ state[0], statIncrement(state[1], action.payload, "goals") ]
  }
}


const PlayerContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(playerReducer, playersInit)
  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  )
}

export {PlayerContext, PlayerContextProvider}
