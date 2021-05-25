import React, {useReducer, createContext} from 'react'

const HalftimeContext = createContext()
const halftimeInit = {time: 0} // 0 = first half, 1 = halftime, 2 = second half, 3 = extra 1, 4 = extra 2, 5 = fulltime

const reducer = (state, action) => {
  switch(action.type) {
    case 'next': return {time: (state.time + 1 < 7 ? state.time + 1 : 6)}
    case 'prev': return {time: (state.time  > 0 ? state.time - 1 : 0)}
    default: console.log(action.type)
  }
}


const HalftimeContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, halftimeInit)
  return (
    <HalftimeContext.Provider value={[state, dispatch]}>
      {children}
    </HalftimeContext.Provider>
  )
}

export {HalftimeContext, HalftimeContextProvider}
