// React utils
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Components
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { DeleteModal } from './components/modals/deleteModal'
import { deleteBoard, getBoards } from '../core/api'
import { Portal } from './components/modals/Portal'
import Card from './components/card'
import ViewTaskModal from './components/modals/ViewTaskModal'

// Modals
import TabletModal from './components/modals/tabletModal'
import { EditBoardModal } from './components/modals/EditBoardModal'

import NewBoardModal from './components/modals/NewBoardModal.refactor'

// Extras
import { initialSettingsState } from './helpers/contants'

function App () {
  const [modalTablet, setModalTablet] = useState(false)
  const [initialBoard, setInitialBoard] = useState(null)
  const [boardSettings, setBoardSettings] = useState(initialSettingsState)
  const [modalBoard, setBoardModal] = useState(false)
  const [activeBoard, setActiveBoard] = useState(null)
  const [activeTaks, setActiveTask] = useState(false)
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

  const openBoardSettings = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, settings: !prevState.settings }))
  const openDeleteBoard = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, delete: !prevState.delete }))
  const openEditBoard = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, edit: !prevState.edit }))
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
    await deleteBoard(initialBoard.at(-1).board_id)
    setInitialBoard(null)
    closeSettings()
  }

  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0

  return (
    <>
      <TabletModal
        changeBoard={changeBoard}
        handleClick={handleClick}
        setBoardModal={setBoardModal}
        modalTable={modalTablet}
        data={initialBoard}
      />
      <HeaderComp
        handleClick={handleClick}
        boardSettings={boardSettings}
        openBoardSettings={openBoardSettings}
        openDeleteBoard={openDeleteBoard}
        openEditBoard={openEditBoard}
        data={activeBoard}
      />
      <main className='bg-kcianli min-w-full h-full px-5 py-6 flex items-start flex-auto gap-6 overflow-x-scroll'>
        {
          showColumnsCondition && activeBoard && activeBoard.board_columns.length > 0
            ? activeBoard.board_columns.map(value => (
              <CardColumn key={value._id} data={value}>
                {value.cards.map(data => (
                  <Card handleViewTask={handleViewTask} key={data._id} data={data}></Card>
                ))}
              </CardColumn>
            ))
            : <EmptyBoard />
        }
      </main>
      { (boardSettings.delete || boardSettings.edit) && createPortal(
        <Portal close={closeSettings}>
          {
            boardSettings.delete && (
              <DeleteModal
                deleteBoard={removeBoard}
                close={closeSettings}
                onClick={e => e.stopPropagation()}
              />
            )
          }
          { boardSettings.edit && <EditBoardModal /> }
          { activeTaks && <ViewTaskModal
                            setActiveTask={setActiveTask}
                            activeBoard={activeBoard}
                            dataTask={dataTask}
                          />
          }
        </Portal>,
        document.body
      )
      }
      {modalBoard && createPortal(<Portal><NewBoardModal /></Portal>, document.body)}
    </>
  )
}

export default App
