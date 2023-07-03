import { useEffect, useState } from 'react'
import { deleteBoard, getBoards } from '../../core/api'
import { ACTIONS } from '../helpers/contants'

function useAxios (dispatch) {
  const [initialBoard, setInitialBoard] = useState(null)
  const [activeBoard, setActiveBoard] = useState(null)
  const [dataTask, setDataTask] = useState(null)

  useEffect(() => {
    if (initialBoard === null) {
      getBoards()
        .then(data => {
          setInitialBoard(data)
          setActiveBoard(data[0])
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [activeBoard])

  const changeBoard = (keyData) => {
    if (keyData !== undefined) {
      const idBoard = initialBoard.find(value => value.board_id === keyData)
      setActiveBoard(idBoard)
    }
    dispatch(ACTIONS.CLOSE_SIDE_MENU)
  }

  const handleViewTask = (keyData) => {
    const subArray = initialBoard.flatMap((value) => value.board_columns.flatMap((column) => column.cards.filter((card) => card._id === keyData)))
    setDataTask(...subArray)
    dispatch(ACTIONS.OPEN_TASK_DETAILS)
  }

  async function removeBoard () {
    await deleteBoard(initialBoard.at(-1).board_id)
    setInitialBoard(null)
    dispatch(ACTIONS.CLOSE_ALL_MODALS)
  }

  const states = {
    initialBoard,
    activeBoard,
    dataTask
  }

  const functions = {
    changeBoard,
    handleViewTask,
    removeBoard
  }

  return { ...states, ...functions }
}

export { useAxios }
