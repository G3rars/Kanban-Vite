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
import { useTheme } from './customHooks/useTheme'
import MiniMenu from './components/modals/MiniMenu'

function App () {
  const [state, dispatch] = useReducer(modalReducer, initialState)
  const { changeTheme } = useTheme()
  const {
    changeBoard,
    handleViewTask,
    removeBoard,
    reloadPage,
    handleEditTask,
    handleDeleteTask,
    setDataTask,
    initialBoard,
    activeBoard,
    dataTask,
    reqStatus,
    isEdit
  } = useAxios(dispatch)
  const showColumnsCondition = Array.isArray(initialBoard) && initialBoard.length !== 0 && activeBoard
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
      />
      {activeBoard && <HeaderComp
        openSideMenu={() => dispatch(MODALS.OPEN_SIDE_MENU)}
        openBoardSettings={() => dispatch(MODALS.OPEN_BOARD_SETTINGS)}
        openDeleteBoard={() => dispatch(MODALS.OPEN_BOARD_DELETE)}
        openEditBoard={() => dispatch(MODALS.OPEN_BOARD_EDIT)}
        addTask={() => dispatch(MODALS.OPEN_NEW_TASK)}
        openMiniMenu={() => dispatch(MODALS.OPEN_MINI_MENU)}
        states={state}
        data={activeBoard}
      />}
      <Main
        openMiniMenu={state.mini_menu}
        close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
        onMiniMenu={
          () => <MiniMenu
            data={initialBoard}
            setBoardModal={() => dispatch(MODALS.OPEN_NEW_BOARD_MODAL)}
            changeBoard={changeBoard}
            changeTheme={changeTheme}
            activeBoard={activeBoard}
          />
        }
      >
        {
          showColumnsCondition && activeBoard.board_columns.length > 0
            ? activeBoard.board_columns.map(value => (
              <CardColumn key={value._id} data={value}>
                {value.cards.map(data => (
                  <Card handleViewTask={handleViewTask} key={data._id} data={data}></Card>
                ))}
              </CardColumn>
            ))
            : !state.loading && <EmptyBoard event={!activeBoard ?? true ? () => dispatch(MODALS.OPEN_NEW_BOARD_MODAL) : () => dispatch(MODALS.OPEN_BOARD_EDIT)} activeBoard={activeBoard} />
        }
        <Portal state={{ ...state, ...reqStatus }} isEdit={isEdit} handleEditTask={handleEditTask} close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}>
          {
            state.delete && (
              <DeleteModal
                deleteBoard={() => removeBoard(activeBoard)}
                handleDeleteTask={() => handleDeleteTask(dataTask)}
                dataTask={dataTask}
                activeBoard={activeBoard}
                setDataTask={setDataTask}
                close={() => { dispatch(MODALS.CLOSE_ALL_MODALS); setDataTask(null) }}
              />
            )
          }
          { state.edit && <EditBoardModal activeBoard={activeBoard} /> }
          { state.new_task && <AddTaskModal isEdit={isEdit} dataTask={dataTask} activeBoard={activeBoard} /> }
          { state.task_details &&
              <ViewTaskModal
                setActiveTask={() => { dispatch(MODALS.OPEN_TASK_DETAILS) } }
                activeBoard={activeBoard}
                dataTask={dataTask}
                editTask={() => dispatch(MODALS.OPEN_NEW_TASK)}
                openDeleteTask={() => dispatch(MODALS.OPEN_BOARD_DELETE)}
                handleEditTask={handleEditTask}
                close={() => dispatch(MODALS.CLOSE_ALL_MODALS)}
                reload={reloadPage}
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
