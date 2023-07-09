import { useEffect, useState, useReducer } from 'react'
import { deleteBoard, deleteCard, getBoards } from '../../core/api'
import { MODALS, REQ_ACTION, initialRequestState, requestReducer } from '../helpers/contants'

function useAxios (action) {
  const [state, dispatch] = useReducer(requestReducer, initialRequestState)
  const [initialBoard, setInitialBoard] = useState(null)
  const [activeBoard, setActiveBoard] = useState(null)
  const [dataTask, setDataTask] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const fetchData = async () => {
    try {
      const data = await getBoards()
      setInitialBoard(data)
      setActiveBoard(data[0])
      dispatch(REQ_ACTION.LOADED)
    } catch (error) {
      console.error(error)
      dispatch(REQ_ACTION.ERROR)
    }
  }

  useEffect(() => {
    if (initialBoard === null) {
      dispatch(REQ_ACTION.LOADING)
      fetchData()
    }
  }, [activeBoard])

  const changeBoard = (keyData) => {
    if (keyData !== undefined) {
      const idBoard = initialBoard.find(value => value.board_id === keyData)
      setActiveBoard(idBoard)
    }
    action(MODALS.CLOSE_SIDE_MENU)
  }

  const handleEditTask = () => {
    setIsEdit(value => !value)
    if (!isEdit) {
      action(MODALS.CLOSE_ALL_MODALS)
      action(MODALS.OPEN_NEW_TASK)
    }
  }

  const handleDeleteTask = (data) => {
    deleteCard(data._id)
  }

  const handleViewTask = (keyData) => {
    const subArray = initialBoard.flatMap((value) => value.board_columns.flatMap((column) => column.cards.filter((card) => card._id === keyData)))
    setDataTask(...subArray)
    action(MODALS.OPEN_TASK_DETAILS)
  }
  async function removeBoard (activeBoard) {
    await deleteBoard(activeBoard.board_id)
    location.reload()
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
    isEdit,
    reqStatus: state
  }

  const functions = {
    changeBoard,
    handleViewTask,
    removeBoard,
    reloadPage,
    handleEditTask,
    handleDeleteTask,
    setDataTask
  }

  return { ...states, ...functions }
}

export { useAxios }
