import React, { useState, useEffect } from 'react'
import TabletModal from './components/tabletModal'
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { getBoards } from '../core/api'

function App () {
  const [modalTablet, setModalTablet] = useState(false)
  const handleClick = () => setModalTablet(prevState => !prevState)
  const [initialBoard, setInitialBoard] = useState(null)

  useEffect(() => {
    if (initialBoard === null) {
      getBoards()
        .then(data => {
          setInitialBoard(() => data)
        })
        .catch(error => {
          setInitialBoard([])
          console.error(error)
        })
    }
  })

  return (
    <>
      <div className='flex flex-col h-[100svh]'>
        <TabletModal
          handleClick={handleClick}
          modalTable={modalTablet}
          data={initialBoard}
        />
        <HeaderComp handleClick={handleClick} />
        {
          !Array.isArray(initialBoard) && <EmptyBoard />
        }
        {
          Array.isArray(initialBoard) && initialBoard.map((board) => {
            return (
            <div key={board._id}>
              <div>tablero: {board.name} </div>
              {/* <CardColumn/> */}
            </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
