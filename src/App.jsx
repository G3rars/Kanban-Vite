// React utils
import React, { useReducer } from 'react'

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
import AddTaskModal from './components/modals/addTaskModal'
import { useAxios } from './customHooks/useAxios'
import {
  MODALS,
  modalReducer,
  initialModalsState as initialState
} from './helpers/contants'
import { Error } from './components/modals/Error'
import { Loading } from './components/layouts/Loading'
import { SideBarButton } from './components/SideBarButton'

function App () {
  const [state, dispatch] = useReducer(modalReducer, initialState)
  const {
    changeBoard,
    handleViewTask,
    removeBoard,
    reloadPage,
    initialBoard,
    activeBoard,
    dataTask,
    reqStatus
  } = useAxios(dispatch)

  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0 && activeBoard

  return (
    <>
      <TabletModal
        changeBoard={changeBoard}
        close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
        setBoardModal={() => dispatch(MODALS.OPEN_NEW_BOARD_MODAL)}
        modalTable={state}
        data={initialBoard}
      />
      <HeaderComp
        handleClick={() => dispatch(MODALS.OPEN_SIDE_MENU)}
        openBoardSettings={() => dispatch(MODALS.OPEN_BOARD_SETTINGS)}
        openDeleteBoard={() => dispatch(MODALS.OPEN_BOARD_DELETE)}
        openEditBoard={() => dispatch(MODALS.OPEN_BOARD_EDIT)}
        addTask={() => dispatch(MODALS.OPEN_NEW_TASK)}
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
            : !state.loading && <EmptyBoard />
        }
        <Portal state={{ ...state, ...reqStatus }} close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}>
          {
            state.delete && (
              <DeleteModal
                deleteBoard={removeBoard}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />
            )
          }
          { state.edit && <EditBoardModal /> }
          { state.new_task && <AddTaskModal activeBoard={activeBoard} /> }
          { state.task_details &&
              <ViewTaskModal
                setActiveTask={() => dispatch(MODALS.OPEN_TASK_DETAILS)}
                activeBoard={activeBoard}
                dataTask={dataTask}
              />
          }
          { state.new_board && <NewBoardModal event={() => dispatch(MODALS.CLOSE_ALL_MODALS)} /> }
          { reqStatus.error && <Error reload={reloadPage} /> }
          { reqStatus.loading && <Loading /> }
        </Portal>
      </Main>
      { state.tablet_btn_bottom && <SideBarButton event={() => dispatch(MODALS.OPEN_SIDE_MENU)} /> }
    </>
  )
}

export default App
