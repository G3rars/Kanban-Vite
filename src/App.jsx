import React, { useState, useEffect } from 'react'
import TabletModal from './components/tabletModal'
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { getBoards } from '../core/api'
import Card from './components/card'

function App () {
  const [modalTablet, setModalTablet] = useState(false)
  const handleClick = () => setModalTablet(prevState => !prevState)
  const [initialBoard, setInitialBoard] = useState(null)
  const [activeBoard, setActiveBoard] = useState(null)

  useEffect(() => {
    if (initialBoard === null) {
      getBoards()
        .then(data => {
          setInitialBoard(data)
          setActiveBoard(data[0])
        })
        .catch(error => {
          setInitialBoard([])
          console.error(error)
        })
    }
  })

  return (
    <>
      <TabletModal
        handleClick={handleClick}
        modalTable={modalTablet}
        data={initialBoard}
      />
      <HeaderComp handleClick={handleClick} />
      <main className='min-w-full h-full px-5 py-6 flex items-start flex-auto gap-6 overflow-x-scroll'>
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
    </>
  )
}

export default App
