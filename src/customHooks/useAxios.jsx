import { useEffect, useState } from 'react'
import { deleteBoard, getBoards } from '../../core/api'
import { MODALS, REQ_ACTION, initialRequestState, requestReducer } from '../helpers/contants'
import { useRed } from './useRed'

function useAxios (action) {
  const { state, dispatch } = useRed({ reducer: requestReducer, initialState: initialRequestState })
  const [initialBoard, setInitialBoard] = useState(null)
  const [activeBoard, setActiveBoard] = useState(null)
  const [dataTask, setDataTask] = useState(null)

  useEffect(() => {
    if (initialBoard === null) {
      dispatch(REQ_ACTION.LOADING)
      getBoards() // necesita un await, ver como convertir esto en asincrono
        .then(data => {
          setInitialBoard(data)
          setActiveBoard(data[0])
          dispatch(REQ_ACTION.LOADED)
        })
        .catch(error => {
          console.error(error)
          dispatch(REQ_ACTION.ERROR)
        })
    }
  }, [activeBoard])

  const changeBoard = (keyData) => {
    if (keyData !== undefined) {
      const idBoard = initialBoard.find(value => value.board_id === keyData)
      setActiveBoard(idBoard)
    }
    action(MODALS.CLOSE_SIDE_MENU)
  }

  const handleViewTask = (keyData) => {
    console.log(keyData, initialBoard)
    const subArray = initialBoard.flatMap((value) => value.board_columns.flatMap((column) => column.cards.filter((card) => card._id === keyData)))
    setDataTask(...subArray)
    action(MODALS.OPEN_TASK_DETAILS)
  }

  async function removeBoard () {
    await deleteBoard(initialBoard.at(-1).board_id)
    setInitialBoard(null)
    action(MODALS.CLOSE_ALL_MODALS)
  }

  function reloadPage () {
    setInitialBoard(null)
    setActiveBoard(null)
  }

  const states = {
    initialBoard,
    activeBoard,
    dataTask,
    reqStatus: state
  }

  const functions = {
    changeBoard,
    handleViewTask,
    removeBoard,
    reloadPage
  }

  return { ...states, ...functions }
}

export { useAxios }
