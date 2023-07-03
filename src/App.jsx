// React utils
import React from 'react'

// Components
import HeaderComp from './components/header'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import Card from './components/card'

// Modals
import { DeleteModal } from './components/modals/deleteModal'
import TabletModal from './components/modals/tabletModal'
import { EditBoardModal } from './components/modals/EditBoardModal'
import ViewTaskModal from './components/modals/ViewTaskModal'
import NewBoardModal from './components/modals/NewBoardModal'

// Layout
import { Portal } from './components/layouts/Portal'
import { Main } from './components/layouts/Main'

// Extras
import { ACTIONS } from './helpers/contants'
import { useModals } from './customHooks/useModals'
import AddTaskModal from './components/modals/addTaskModal'
import { useAxios } from './customHooks/useAxios'

function App () {
  const { state, dispatch } = useModals()
  const {
    changeBoard,
    handleViewTask,
    removeBoard,
    initialBoard,
    activeBoard,
    dataTask
  } = useAxios(dispatch)

  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0 && activeBoard

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
        openBoardSettings={() => dispatch(ACTIONS.OPEN_BOARD_SETTINGS)}
        openDeleteBoard={() => dispatch(ACTIONS.OPEN_BOARD_DELETE)}
        openEditBoard={() => dispatch(ACTIONS.OPEN_BOARD_EDIT)}
        addTask={() => dispatch(ACTIONS.OPEN_NEW_TASK)}
        boardSettings={state}
        data={activeBoard}
      />
      <Main>
        {
          showColumnsCondition && activeBoard.board_columns.length > 0
            ? activeBoard.board_columns.map(value => (
              <CardColumn key={value._id} data={value}>
                {value.cards.map(data => (
                  <Card handleViewTask={handleViewTask} key={data._id} data={data}></Card>
                ))}
              </CardColumn>
            ))
            : <EmptyBoard />
        }
        <Portal state={state} close={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)}>
          {
            state.delete && (
              <DeleteModal
                deleteBoard={removeBoard}
                close={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)}
              />
            )
          }
          { state.edit && <EditBoardModal /> }
          { state.new_task && <AddTaskModal /> }
          { state.task_details &&
              <ViewTaskModal
                setActiveTask={() => dispatch(ACTIONS.OPEN_TASK_DETAILS)}
                activeBoard={activeBoard}
                dataTask={dataTask}
              />
          }
          { state.new_board && <NewBoardModal event={() => dispatch(ACTIONS.CLOSE_ALL_MODALS)} /> }
        </Portal>
      </Main>
    </>
  )
}

export default App
