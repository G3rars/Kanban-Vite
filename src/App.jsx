import React, { useState, useEffect } from 'react'
import TabletModal from './components/modals/tabletModal'
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { DeleteModal } from './components/modals/deleteModal'
import { deleteBoard, getBoards } from '../core/api'
import { createPortal } from 'react-dom'
import { Portal } from './components/modals/Portal'
import Card from './components/card'
import ViewTaskModal from './components/modals/ViewTaskModal'

const initialSettingsState = {
  settings: false,
  delete: false,
  edit: false
}

function App () {
  const [modalTablet, setModalTablet] = useState(false)
  const [initialBoard, setInitialBoard] = useState(null)
  const [boardSettings, setBoardSettings] = useState(initialSettingsState)
  const [activeBoard, setActiveBoard] = useState(null)
  const [activeTaks, setActiveTask] = useState(false)
  const [dataTask, setDataTask] = useState(null)

  useEffect(() => {
    if (initialBoard === null) {
      console.log('useEffect')
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

  const openBoardSettings = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, settings: !prevState.settings }))
  const openDeleteBoard = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, delete: !prevState.delete }))
  const closeSettings = () => setBoardSettings(initialSettingsState)
  const handleClick = () => setModalTablet(prevState => !prevState)

  const changeBoard = (e, keyData) => {
    e.preventDefault()
    const idBoard = initialBoard.find(value => value.board_id === keyData)
    setActiveBoard(idBoard)
    handleClick()
  }

  const handleViewTask = (keyData) => {
    const subArray = initialBoard.flatMap((value) => value.board_columns.flatMap((column) => column.cards.filter((card) => card._id === keyData)))
    setDataTask(...subArray)
    setActiveTask(prevState => !prevState)
  }

  async function removeBoard () {
    await deleteBoard(initialBoard[0].board_id)
    setInitialBoard(null)
    closeSettings()
  }

  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0

  return (
    <>
      <TabletModal
        changeBoard={changeBoard}
        handleClick={handleClick}
        modalTable={modalTablet}
        data={initialBoard}
      />
      <HeaderComp data={activeBoard} handleClick={handleClick} boardSettings={boardSettings} openBoardSettings={openBoardSettings} openDeleteBoard={openDeleteBoard} />
      <main className='bg-kcianli min-w-full h-full px-5 py-6 flex items-start flex-auto gap-6 overflow-x-scroll'>
        {
                showColumnsCondition && activeBoard && activeBoard.board_columns.length > 0
                  ? (
                      activeBoard.board_columns.map(value => (
      <CardColumn key={value._id} data={value}>
        {value.cards.map(data => (
          <Card handleViewTask={handleViewTask} key={data._id} data={data}></Card>
        ))}
      </CardColumn>
                      ))
                    )
                  : (
    <EmptyBoard />
                    )
}
      </main>
      {
        activeTaks && <ViewTaskModal activeBoard={activeBoard} dataTask={dataTask} setActiveTask={setActiveTask}/>
      }
      { boardSettings.delete && createPortal(
        <Portal>
          <DeleteModal
            deleteBoard={removeBoard}
            close={closeSettings} />
        </Portal>,
        document.body
      )
      }
    </>
  )
}

export default App
