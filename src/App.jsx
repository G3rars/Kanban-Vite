// React utils
import React, { useReducer } from 'react'

// Components
import { EmptyBoard } from './components/EmptyBoard'
import { CardColumn } from './components/CardColumn'
import { SideBarButton } from './components/SideBarButton'
import HeaderComp from './components/header'
import Card from './components/card'

// Modals
import { DeleteModal } from './components/modals/deleteModal'
import { EditBoardModal } from './components/modals/EditBoardModal'
import { Error } from './components/modals/Error'
import TabletModal from './components/modals/tabletModal'
import ViewTaskModal from './components/modals/ViewTaskModal'
import NewBoardModal from './components/modals/NewBoardModal'
import MiniMenu from './components/modals/MiniMenu'
import AddTaskModal from './components/modals/addTaskModal'

// Layout
import { Portal } from './components/layouts/Portal'
import { Main } from './components/layouts/Main'
import { Loading } from './components/layouts/Loading'

// Extras
import { useAxios } from './customHooks/useAxios'
import { useTheme } from './customHooks/useTheme'
import {
  MODALS,
  modalReducer,
  initialModalsState as initialState
} from './helpers/contants'

function App () {
  const [state, dispatch] = useReducer(modalReducer, initialState)
  const { changeTheme, darkTheme } = useTheme()
  const {
    changeBoard,
    handleViewTask,
    removeBoard,
    handleEditTask,
    handleDeleteTask,
    setDataTask,
    setInitialBoard,
    setActiveBoard,
    updateBoards,
    initialBoard,
    activeBoard,
    dataTask,
    reqStatus,
    isEdit
  } = useAxios(dispatch)
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
        <HeaderComp
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
            ? activeBoard.columns.map(value => (
                <CardColumn key={value._id} data={value}>
                  {value.cards.length !== 0 && value.cards.map(data => (
                    <Card handleViewTask={handleViewTask} key={data._id} data={data} />
                  ))}
                </CardColumn>
            ))
            : !state.loading && <EmptyBoard event={!activeBoard ? () => dispatch(MODALS.OPEN_NEW_BOARD_MODAL) : () => dispatch(MODALS.OPEN_BOARD_EDIT)} activeBoard={activeBoard} />
        }
        <Portal
          state={{ ...state, ...reqStatus }}
          isEdit={isEdit}
          handleEditTask={handleEditTask}
          close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
          onDelete={() =>
              <DeleteModal
                deleteBoard={() => removeBoard(activeBoard)}
                handleDeleteTask={() => handleDeleteTask(dataTask)}
                dataTask={dataTask}
                activeBoard={activeBoard}
                setDataTask={setDataTask}
                close={() => { dispatch(MODALS.CLOSE_ALL_MODALS); setDataTask(null) }}
              />}
          onEditBoard={() =>
              <EditBoardModal
                setActiveBoard={setActiveBoard}
                updateBoards={updateBoards}
                activeBoard={activeBoard}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />}
          onAddTask={() =>
              <AddTaskModal
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
                isEdit={isEdit}
                dataTask={dataTask}
                activeBoard={activeBoard}
                setActiveBoard={setActiveBoard}
              />}
          onViewTask={() =>
              <ViewTaskModal
                setActiveTask={() => { dispatch(MODALS.OPEN_TASK_DETAILS) } }
                activeBoard={activeBoard}
                dataTask={dataTask}
                editTask={() => dispatch(MODALS.OPEN_NEW_TASK)}
                openDeleteTask={() => dispatch(MODALS.OPEN_BOARD_DELETE)}
                handleEditTask={handleEditTask}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />}
          onNewBoard={() =>
              <NewBoardModal setInitialBoard={setInitialBoard}
              initialBoard={initialBoard}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
              />}
          onError={() => <Error />}
          onLoading={() => <Loading />}
        />
      </Main>
      { state.tablet_btn_bottom && <SideBarButton event={() => dispatch(MODALS.OPEN_SIDE_MENU)} /> }
    </>
  )
}

export default App
