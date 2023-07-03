// React utils
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Components
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { deleteBoard, getBoards } from '../core/api'
import Card from './components/card'

// Modals
import { DeleteModal } from './components/modals/deleteModal'
import { Portal } from './components/modals/Portal'
import TabletModal from './components/modals/tabletModal'
import { EditBoardModal } from './components/modals/EditBoardModal'
import ViewTaskModal from './components/modals/ViewTaskModal'
import NewBoardModal from './components/modals/NewBoardModal'

// Extras
import { ACTIONS } from './helpers/contants'
import { useModals } from './components/customHooks/useModals'

function App () {
  const [initialBoard, setInitialBoard] = useState(null)
  const [activeBoard, setActiveBoard] = useState(null)
  const [activeTaks, setActiveTask] = useState(false)
  const [dataTask, setDataTask] = useState(null)
  const { state, dispatch } = useModals()

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

  const changeBoard = (e, keyData) => {
    e.preventDefault()
    const idBoard = initialBoard.find(value => value.board_id === keyData)
    setActiveBoard(idBoard)
    dispatch(ACTIONS.CLOSE_SIDE_MENU)
  }

  const handleViewTask = (keyData) => {
    const subArray = initialBoard.flatMap((value) => value.board_columns.flatMap((column) => column.cards.filter((card) => card._id === keyData)))
    setDataTask(...subArray)
    setActiveTask(prevState => !prevState)
  }

  async function removeBoard () {
    await deleteBoard(initialBoard.at(-1).board_id)
    setInitialBoard(null)
    dispatch(ACTIONS.CLOSE_ALL_MODALS)
  }

  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0

  return (
    <>
      <TabletModal
        changeBoard={changeBoard}
        handleClick={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)}
        setBoardModal={() => dispatch(ACTIONS.OPEN_NEW_BOARD_MODAL)}
        modalTable={state}
        data={initialBoard}
      />
      <HeaderComp
        handleClick={() => dispatch(ACTIONS.OPEN_SIDE_MENU)}
        boardSettings={state}
        openBoardSettings={() => dispatch(ACTIONS.OPEN_BOARD_SETTINGS)}
        openDeleteBoard={() => dispatch(ACTIONS.OPEN_BOARD_DELETE)}
        openEditBoard={() => dispatch(ACTIONS.OPEN_BOARD_EDIT)}
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
      { (state.delete || state.edit) && createPortal(
        <Portal close={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)}>
          {
            state.delete && (
              <DeleteModal
                deleteBoard={removeBoard}
                close={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)}
                onClick={e => e.stopPropagation()}
              />
            )
          }
          { state.edit && <EditBoardModal /> }
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
      {state.new_board && createPortal(
        <Portal close={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)}>
          <NewBoardModal event={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)} />
        </Portal>,
        document.body
      )}
    </>
  )
}

export default App
