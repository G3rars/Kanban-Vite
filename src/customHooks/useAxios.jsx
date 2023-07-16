import { useReducer } from 'react'
import { getBoards } from '../../core/api'
import { REQ_ACTION, initialRequestState, requestReducer } from '../helpers/contants'

function useAxios ({ loadAllBoards, updateActiveBoard }) {
  const [state, dispatch] = useReducer(requestReducer, initialRequestState)

  const fetchData = async (SAVED_ID) => {
    try {
      dispatch(REQ_ACTION.LOADING)
      const boards = await getBoards()
      loadAllBoards(boards)
      if (SAVED_ID) {
        const index = boards.findIndex((item) => item._id === SAVED_ID)
        if (index !== -1) updateActiveBoard(boards[index])
        if (index === -1 && boards.length !== 0) updateActiveBoard(boards[0])
      } else if (boards.length !== 0) updateActiveBoard(boards[0])
      dispatch(REQ_ACTION.LOADED)
    } catch (error) {
      console.error(error)
      dispatch(REQ_ACTION.ERROR)
    }
  }

  return {
    reqStatus: state,
    fetchData
  }
}

export { useAxios }
