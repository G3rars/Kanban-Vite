import { useReducer } from 'react'

function useRed ({ reducer, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

export { useRed }
