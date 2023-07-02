// React utils
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Components
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import Card from './components/card'

// Modals
import TabletModal from './components/modals/tabletModal'
import { DeleteModal } from './components/modals/deleteModal'
import { Portal } from './components/modals/Portal'
import { EditBoardModal } from './components/modals/EditBoardModal'

// Extras
import { deleteBoard, getBoards } from '../core/api'
import { initialSettingsState } from './helpers/contants'

function App () {
  const [modalTablet, setModalTablet] = useState(false)
  const [initialBoard, setInitialBoard] = useState(null)
  const [boardSettings, setBoardSettings] = useState(initialSettingsState)

  useEffect(() => {
    if (initialBoard === null) {
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
  const openEditBoard = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, edit: !prevState.edit }))
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
      <HeaderComp
        handleClick={handleClick}
        boardSettings={boardSettings}
        openBoardSettings={openBoardSettings}
        openDeleteBoard={openDeleteBoard}
        openEditBoard={openEditBoard}
      />
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
      { (boardSettings.delete || boardSettings.edit) && createPortal(
        <Portal close={closeSettings} >
          {
            boardSettings.delete && (
              <DeleteModal
                deleteBoard={removeBoard}
                close={closeSettings}
                onClick={e => e.stopPropagation()}
              />
            )
          }
          {
            boardSettings.edit && (
              <EditBoardModal />
            )
          }
        </Portal>,
        document.body
      )
      }
    </>
  )
}

export default App
