import React, { useState, useEffect } from 'react'
import TabletModal from './components/modals/tabletModal'
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { DeleteModal } from './components/modals/deleteModal'
import { deleteBoard, getBoards } from '../core/api'
import Card from './components/card'
import { createPortal } from 'react-dom'
import { Portal } from './components/modals/Portal'

const initialSettingsState = {
  settings: false,
  delete: false,
  edit: false
}

function App () {
  const [modalTablet, setModalTablet] = useState(false)
  const [initialBoard, setInitialBoard] = useState(null)
  const [boardSettings, setBoardSettings] = useState(initialSettingsState)

  useEffect(() => {
    if (initialBoard === null) {
      console.log('useEffect')
      getBoards()
        .then(data => {
          setInitialBoard(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [initialBoard])

  const openBoardSettings = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, settings: !prevState.settings }))
  const openDeleteBoard = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, delete: !prevState.delete }))
  const closeSettings = () => setBoardSettings(initialSettingsState)
  const handleClick = () => setModalTablet(prevState => !prevState)

  async function removeBoard () {
    await deleteBoard(initialBoard[0].board_id)
    setInitialBoard(null)
    closeSettings()
  }

  const EmptyBoardCondition = initialBoard === null || (Array.isArray(initialBoard) && initialBoard.length === 0)
  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0

  return (
    <>
      <TabletModal
        handleClick={handleClick}
        modalTable={modalTablet}
        data={initialBoard}
      />
      <HeaderComp handleClick={handleClick} boardSettings={boardSettings} openBoardSettings={openBoardSettings} openDeleteBoard={openDeleteBoard} />
      <main className='bg-kcianli min-w-full h-full px-5 py-6 flex items-start flex-auto gap-6 overflow-x-scroll'>
        {
          (EmptyBoardCondition) && <EmptyBoard />
        }
        {
          (showColumnsCondition) && (
            <>
              <CardColumn key={'a'}> <Card /> </CardColumn >
              <CardColumn key={'b'}> <Card /> </CardColumn >
            </>
          )
        }
      </main>
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
