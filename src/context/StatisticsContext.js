import React, {useReducer, createContext, useEffect} from 'react'
import Player from '../Player'

const StatisticsContext = createContext()
const statisticsInit = {
  goals: [0,0],
  corners: [0,0],
  offsides: [0,0],
  shots: [0,0],
  attempts: [0,0],
  fouls: [[0,0], [0,0]],
  yellows: [[0,0], [0,0]],
  reds: [[0,0], [0,0]]
}

//team = 0 / 1
const IncrementStat = (prevVal, team) => {
  if (team) return [prevVal[0], Number(prevVal[1]) + 1]
  return [Number(prevVal[0]) + 1, prevVal[1]]
}
const decrementStat = (prevVal, team) => {
  if (team) return [prevVal[0], Number(prevVal[1]) - 1 > 0 ? Number(prevVal[1]) - 1 : 0]
  return [Number(prevVal[0]) - 1 > 0 ? Number(prevVal[0]) - 1 : 0, prevVal[1]]
}

//time = 0 ali 1      team = 0 ali 1
const IncrementFoulFirstHalf = (prevVal, team) => {
  console.log(team)
  if (team == 1) return [prevVal[0], [ Number(prevVal[1][0]) + 1, prevVal[1][1] ]]
  return [[ Number(prevVal[0][0]) + 1, prevVal[0][1] ], prevVal[1]]
}
const IncrementFoulSecondHalf = (prevVal, team) => {
  if (team == 1) return [prevVal[0], [ prevVal[1][0], Number(prevVal[1][1]) + 1 ]]
  return [[ prevVal[0][0], Number(prevVal[0][1]) + 1 ], prevVal[1]]
}
const DecrementFoulFirstHalf = (prevVal, team) => {
  if (team == 1) return [prevVal[0], [ Number(prevVal[1][0]) - 1, prevVal[1][1] ]]
  return [[ Number(prevVal[0][0]) - 1, prevVal[0][1] ], prevVal[1]]
}
const DecrementFoulSecondHalf = (prevVal, team) => {
  if (team == 1) return [prevVal[0], [ prevVal[1][0], Number(prevVal[1][1]) - 1 ]]
  return [[ prevVal[0][0], Number(prevVal[0][1]) - 1 ], prevVal[1]]
}

function reducer(state, action) {
  console.log(action.type)
  console.log(action.team)
  switch (action.type) {
    case 'goal':
      return {...state, goals: IncrementStat(state.goals, action.team)};
    case 'shot':
      return {...state, shots: IncrementStat(state.shots, action.team)};
    case 'attempt':
      return {...state, attempts: IncrementStat(state.attempts, action.team)};
    case 'corner':
      return {...state, corners: IncrementStat(state.corners, action.team)};
    case 'offside':
      return {...state, offsides: IncrementStat(state.offsides, action.team)};
    case 'foulFirst':
      return {...state, fouls: IncrementFoulFirstHalf(state.fouls, action.team)};
    case 'yellowFirst':
      return {...state, yellows: IncrementFoulFirstHalf(state.yellows, action.team)};
    case 'redFirst':
      return {...state, reds: IncrementFoulFirstHalf(state.reds, action.team)};
    case 'foulSecond':
      return {...state, fouls: IncrementFoulSecondHalf(state.fouls, action.team)};
    case 'yellowSecond':
      return {...state, yellows: IncrementFoulSecondHalf(state.yellows, action.team)};
    case 'redSecond':
      return {...state, reds: IncrementFoulSecondHalf(state.reds, action.team)};
    case 'goalTakeAway':
      return {...state, goals: decrementStat(state.goals, action.team)};
    case 'shotTakeAway':
      return {...state, shots: decrementStat(state.shots, action.team)};
    case 'attemptTakeAway':
      return {...state, attempts: decrementStat(state.attempts, action.team)};
    case 'cornerTakeAway':
      return {...state, corners: decrementStat(state.corners, action.team)};
    case 'offsideTakeAway':
      return {...state, offsides: decrementStat(state.offsides, action.team)};
    case 'foulTakeAwayFirst':
      return {...state, fouls: DecrementFoulFirstHalf(state.fouls, action.team)};
    case 'yellowTakeAwayFirst':
      return {...state, yellows: DecrementFoulFirstHalf(state.yellows, action.team)};
    case 'redTakeAwayFirst':
      return {...state, reds: DecrementFoulFirstHalf(state.reds, action.team)};
    case 'foulTakeAwaySecond':
      return {...state, fouls: DecrementFoulSecondHalf(state.fouls, action.team)};
    case 'yellowTakeAwaySecond':
      return {...state, yellows: DecrementFoulSecondHalf(state.yellows, action.team)};
    case 'redTakeAwaySecond':
      return {...state, reds: DecrementFoulSecondHalf(state.reds, action.team)};
    default:
      throw new Error();
  }
}

const StatisticsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, statisticsInit);
  useEffect(() => {
    console.log('jup jup')
    fetch(`http://localhost:4545/score/${state.goals[0]}/${state.goals[1]}`)
  })

  return (
    <StatisticsContext.Provider value={[state, dispatch]}>
      {children}
    </StatisticsContext.Provider>
  )
}

export {StatisticsContext, StatisticsContextProvider}
