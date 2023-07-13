import { useEffect, useState, useReducer } from 'react'
import { deleteBoard, deleteCard, getBoards } from '../../core/api'
import { MODALS, REQ_ACTION, initialRequestState, requestReducer } from '../helpers/contants'

function useAxios (dispatchAction) {
  const [state, dispatch] = useReducer(requestReducer, initialRequestState)
  const [initialBoard, setInitialBoard] = useState([])
  const [activeBoard, setActiveBoard] = useState(null)
  const [dataTask, setDataTask] = useState(null)

  const fetchData = async () => {
    try {
      const data = await getBoards()
      setInitialBoard(data)
      if (data.length !== 0) setActiveBoard(data[0])
      dispatch(REQ_ACTION.LOADED)
    } catch (error) {
      console.error(error)
      dispatch(REQ_ACTION.ERROR)
    }
  }

  useEffect(() => {
    dispatch(REQ_ACTION.LOADING)
    fetchData()
  }, [])

  useEffect(() => {
    if (Array.isArray(initialBoard) && initialBoard.length === 1) {
      setActiveBoard(initialBoard.at(0))
    }

    if (Array.isArray(initialBoard) && initialBoard.length === 0) {
      setActiveBoard(null)
    }
  }, [initialBoard])

  const changeBoard = (keyData) => {
    if (keyData !== undefined) {
      const idBoard = initialBoard.find(value => value._id === keyData)
      setActiveBoard(idBoard)
    }
    dispatchAction(MODALS.CLOSE_SIDE_MENU)
  }

  const handleDeleteTask = (data) => {
    deleteCard(data._id)
  }

  const handleViewTask = (keyData) => {
    const subArray = initialBoard.flatMap((value) => value.columns.flatMap((column) => column.cards.filter((card) => card._id === keyData)))
    setDataTask(...subArray)
    dispatchAction(MODALS.OPEN_TASK_DETAILS)
  }

  async function removeBoard (activeBoard) {
    await deleteBoard(activeBoard._id)
    const index = initialBoard.findIndex((item) => item._id === activeBoard._id)
    initialBoard.splice(index, 1)
    setActiveBoard(initialBoard.at(0))
    dispatchAction(MODALS.CLOSE_ALL_MODALS)
  }

  function updateBoards (board) {
    const newBoards = [...initialBoard]
    const index = newBoards.findIndex((item) => item._id === board._id)
    newBoards.splice(index, 1, board)
    setInitialBoard(newBoards)
  }

  function replaceBoardCard ({ newTask, oldCard }) {
    const newBoard = { ...activeBoard }
    const columnIndex = newBoard.columns.findIndex((col) => col._id === newTask.column)
    const cardIndex = newBoard.columns[columnIndex].cards.findIndex((card) => card._id === oldCard._id)
    if (newTask.column === oldCard.column) newBoard.columns[columnIndex].cards.splice(cardIndex, 1, newTask)
    else {
      const oldColumnIndex = newBoard.columns.findIndex((col) => col._id === oldCard.column)
      const oldCardIndex = newBoard.columns[oldColumnIndex].cards.findIndex((card) => card._id === oldCard._id)
      newBoard.columns[oldColumnIndex].cards.splice(oldCardIndex, 1)
      newBoard.columns[columnIndex].cards.push(newTask)
    }
    setActiveBoard(newBoard)
    updateBoards(newBoard)
  }

  function addCardToColumn ({ newTask }) {
    const newBoard = { ...activeBoard }
    const index = newBoard.columns.findIndex((item) => item._id === newTask.column)
    newBoard.columns[index].cards.push(newTask)
    setActiveBoard(newBoard)
    updateBoards(newBoard)
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
    handleDeleteTask,
    setDataTask,
    setInitialBoard,
    setActiveBoard,
    updateBoards,
    replaceBoardCard,
    addCardToColumn
  }

  return { ...states, ...functions }
}

export { useAxios }
