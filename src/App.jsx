import React, { useState, useEffect } from 'react'
import TabletModal from './components/modals/tabletModal'
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { getBoards } from '../core/api'
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
  const [activeBoard, setActiveBoard] = useState(null)
  const [boardSettings, setBoardSettings] = useState(initialSettingsState)

  useEffect(() => {
    getBoards()
      .then(data => {
        setInitialBoard(data)
        setActiveBoard(data[0])
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const openBoardSettings = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, settings: !prevState.settings }))
  const openDeleteBoard = () => setBoardSettings(prevState => ({ initialState: initialSettingsState, delete: !prevState.delete }))
  const closeSettings = () => setBoardSettings(initialSettingsState)
  const handleClick = () => setModalTablet(prevState => !prevState)

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
          !Array.isArray(initialBoard) && <EmptyBoard />
        }
        {
          activeBoard !== null && (
            <>
              <CardColumn key={'a'}> <Card /> </CardColumn >
              <CardColumn key={'b'}> <Card /> </CardColumn >
            </>
          )
        }
      </main>
      { boardSettings.delete && createPortal(<Portal closeSettings={closeSettings} />, document.body) }
    </>
  )
}

export default App
