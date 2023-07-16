// React utils
import React, { useReducer } from 'react'

// Components
import { NewColumnButton } from './components/NewColumnButton'
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { SideBarButton } from './components/SideBarButton'
import { Header } from './components/header'
import { Card } from './components/card'

// Modals
import { DeleteModal } from './modals/deleteModal'
import { EditBoardModal } from './modals/EditBoardModal'
import { Error } from './modals/Error'
import { TabletModal } from './modals/tabletModal'
import { ViewTaskModal } from './modals/ViewTaskModal'
import { NewBoardModal } from './modals/NewBoardModal'
import { MiniMenu } from './modals/MiniMenu'
import { AddTaskModal } from './modals/addTaskModal'

// Layout
import { Portal } from './layouts/Portal'
import { Main } from './layouts/Main'
import { Loading } from './layouts/Loading'

// Hooks
import { useTheme } from './customHooks/useTheme'
import { useBoards } from './customHooks/useBoards'

// constants
import {
  MODALS,
  modalReducer,
  modalStates
} from './helpers/contants'

// extras
import { ToastContainer } from 'react-toastify'

function App () {
  const [state, dispatch] = useReducer(modalReducer, modalStates)
  const { changeTheme, darkTheme } = useTheme()
  const {
    changeBoard,
    handleViewTask,
    updateActiveBoard,
    removeBoard,
    handleDeleteTask,
    resetDataTask,
    updateBoards,
    replaceBoardCard,
    addCardToColumn,
    initialBoard,
    activeBoard,
    dataTask,
    reqStatus
  } = useBoards(dispatch)

  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0 && activeBoard && activeBoard.columns.length !== 0

  return (
    <>
      <TabletModal
        data={initialBoard}
        setBoardModal={() => dispatch(MODALS.OPEN_NEW_BOARD_MODAL)}
        changeBoard={changeBoard}
        changeTheme={changeTheme}
        activeBoard={activeBoard}
        close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
        modalTable={state}
        darkTheme={darkTheme}
      />
      {activeBoard &&
        <Header
          openSideMenu={() => dispatch(MODALS.OPEN_SIDE_MENU)}
          openBoardSettings={() => dispatch(MODALS.OPEN_BOARD_SETTINGS)}
          openDeleteBoard={() => dispatch(MODALS.OPEN_BOARD_DELETE)}
          openEditBoard={() => dispatch(MODALS.OPEN_BOARD_EDIT)}
          addTask={() => dispatch(MODALS.OPEN_NEW_TASK)}
          openMiniMenu={() => dispatch(MODALS.OPEN_MINI_MENU)}
          states={state}
          data={activeBoard}
        />
      }
      <Main
        openMiniMenu={state.mini_menu}
        close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
        onMiniMenu={() =>
          <MiniMenu
            data={initialBoard}
            darkTheme={darkTheme}
            setBoardModal={() => dispatch(MODALS.OPEN_NEW_BOARD_MODAL)}
            changeBoard={changeBoard}
            changeTheme={changeTheme}
            activeBoard={activeBoard}
          />
        }
      >
        {
          showColumnsCondition
            ? activeBoard.columns.map((column, index) => (
                <CardColumn key={column._id} data={column} index={index}>
                  {column.cards.length !== 0 && column.cards.map(task => (
                    <Card handleViewTask={handleViewTask} key={task._id} data={task} />
                  ))}
                </CardColumn>
            ))
            : !state.loading &&
              <EmptyBoard
                activeBoard={activeBoard}
                event={!activeBoard
                  ? () => dispatch(MODALS.OPEN_NEW_BOARD_MODAL)
                  : () => dispatch(MODALS.OPEN_BOARD_EDIT)
                }
              />
        }
        {
          showColumnsCondition && <NewColumnButton event={() => dispatch(MODALS.OPEN_BOARD_EDIT)}/>
        }
        <Portal
          state={{ ...state, ...reqStatus }}
          close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
          onDelete={() =>
              <DeleteModal
                deleteBoard={() => removeBoard(activeBoard)}
                handleDeleteTask={() => handleDeleteTask(dataTask)}
                dataTask={dataTask}
                activeBoard={activeBoard}
                close={() => { dispatch(MODALS.CLOSE_ALL_MODALS); resetDataTask() }}
              />}
          onEditBoard={() =>
              <EditBoardModal
                updateActiveBoard={updateActiveBoard}
                updateBoards={updateBoards}
                activeBoard={activeBoard}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />}
          onAddTask={() =>
              <AddTaskModal
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
                isEdit={state.edit_task}
                dataTask={dataTask}
                activeBoard={activeBoard}
                updateBoards={updateBoards}
                replaceBoardCard={replaceBoardCard}
                addCardToColumn={addCardToColumn}
              />}
          onViewTask={() =>
              <ViewTaskModal
                setActiveTask={() => { dispatch(MODALS.OPEN_TASK_DETAILS) } }
                activeBoard={activeBoard}
                initialBoard={initialBoard}
                replaceBoardCard={replaceBoardCard}
                dataTask={dataTask}
                editTask={() => dispatch(MODALS.OPEN_EDIT_TASK)}
                openDeleteTask={() => dispatch(MODALS.OPEN_BOARD_DELETE)}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />}
          onNewBoard={() =>
              <NewBoardModal
                updateBoards={updateBoards}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />}
          onError={() => <Error />}
          onLoading={() => <Loading />}
        />
      </Main>
      { state.tablet_btn_bottom && <SideBarButton event={() => dispatch(MODALS.OPEN_SIDE_MENU)} /> }
      <ToastContainer />
    </>
  )
}

export default App
