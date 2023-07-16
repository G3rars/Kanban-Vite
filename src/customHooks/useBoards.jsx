import { useEffect, useState } from 'react'
import { deleteBoard, deleteCard } from '../../core/api'
import { MODALS, USER_CONFIG } from '../helpers/contants'
import { useAxios } from './useAxios'
import { toast } from 'react-toastify'
import { Alert } from '../helpers/alerts'
import { useStorage } from './useStorage'

function useBoards (dispatchAction) {
  const [initialBoard, setInitialBoard] = useState([])
  const [activeBoard, setActiveBoard] = useState(null)
  const [dataTask, setDataTask] = useState(null)
  const { fetchData, reqStatus } = useAxios({ loadAllBoards, updateActiveBoard })
  const { getSavedItem, saveItem } = useStorage({ storageName: USER_CONFIG.ACTIVE_BOARD })

  useEffect(() => {
    const savedBoard = getSavedItem()
    fetchData(savedBoard)
  }, [])

  useEffect(() => {
    if (Array.isArray(initialBoard) && initialBoard.length === 1) {
      setActiveBoard(initialBoard.at(0))
    }

    if (Array.isArray(initialBoard) && initialBoard.length === 0) {
      setActiveBoard(null)
    }
  }, [initialBoard])

  function loadAllBoards (boards) {
    setInitialBoard(boards)
  }

  function updateActiveBoard (board) {
    setActiveBoard(board)
    saveItem(board._id)
  }

  function resetDataTask () {
    setDataTask(null)
  }

  function updateBoards (board) {
    const newBoards = [...initialBoard]
    const index = newBoards.findIndex((item) => item._id === board._id)
    index === -1
      ? newBoards.push(board)
      : newBoards.splice(index, 1, board)
    setInitialBoard(newBoards)
  }

  const changeBoard = (keyData) => {
    if (keyData !== undefined) {
      const idBoard = initialBoard.find(value => value._id === keyData)
      updateActiveBoard(idBoard)
    }
    dispatchAction(MODALS.CLOSE_SIDE_MENU)
  }

  const handleDeleteTask = async (data) => {
    const loadingId = toast.loading('Please wait...', { autoClose: false })
    try {
      await deleteCard(data._id)
      Alert(() => Promise.resolve(), loadingId, 'The task has been deleted')
      removeCard({ oldCard: data })
      dispatchAction(MODALS.CLOSE_ALL_MODALS)
    } catch (error) {
      Alert(() => Promise.reject(error), loadingId)
    }
  }

  function removeCard ({ oldCard }) {
    const newBoard = { ...activeBoard }
    const index = newBoard.columns.findIndex((item) => item._id === oldCard.column)
    const cardIndex = newBoard.columns[index].cards.findIndex((card) => card._id === oldCard._id)
    newBoard.columns[index].cards.splice(cardIndex, 1)
    updateActiveBoard(newBoard)
    updateBoards(newBoard)
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
    updateActiveBoard(initialBoard.at(0))
    dispatchAction(MODALS.CLOSE_ALL_MODALS)
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
    updateActiveBoard(newBoard)
    updateBoards(newBoard)
  }

  function addCardToColumn ({ newTask }) {
    const newBoard = { ...activeBoard }
    const index = newBoard.columns.findIndex((item) => item._id === newTask.column)
    newBoard.columns[index].cards.push(newTask)
    updateActiveBoard(newBoard)
    updateBoards(newBoard)
  }

  const states = {
    initialBoard,
    activeBoard,
    dataTask,
    reqStatus
  }

  const functions = {
    changeBoard,
    handleViewTask,
    removeBoard,
    handleDeleteTask,
    resetDataTask,
    updateActiveBoard,
    updateBoards,
    replaceBoardCard,
    addCardToColumn
  }

  return { ...states, ...functions }
}

export { useBoards }
