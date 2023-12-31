const USER_CONFIG = {
  ACTIVE_BOARD: 'activeBoard',
  THEME: 'theme'
}

const modalStates = {
  settings: false,
  delete: false,
  edit: false,
  new_board: false,
  side_menu: false,
  task_details: false,
  new_task: false,
  tablet_btn_bottom: true,
  mini_menu: false,
  edit_task: false
}

const initialRequestState = {
  loading: false,
  error: false
}

const MODALS = {
  OPEN_BOARD_SETTINGS: 'openBoardSettings',
  OPEN_BOARD_EDIT: 'openBoardEdit',
  OPEN_BOARD_DELETE: 'openBoardDelete',
  OPEN_NEW_BOARD_MODAL: 'openNewBoardModal',
  OPEN_SIDE_MENU: 'openSideMenu',
  OPEN_TASK_DETAILS: 'openTaskDetails',
  OPEN_NEW_TASK: 'openMewTask',
  OPEN_EDIT_TASK: 'openEditTask',
  OPEN_MINI_MENU: 'openMiniMenu',
  CLOSE_SIDE_MENU: 'closeSideMenu',
  CLOSE_NEW_BOARD_MODAL: 'closeNewBoardModal',
  CLOSE_ALL_MODALS: 'closeAll'
}

const REQ_ACTION = {
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded'
}

function requestReducer (state, action) {
  switch (action) {
    case REQ_ACTION.LOADING:
      return { ...state, error: false, loading: true }
    case REQ_ACTION.ERROR:
      return { ...state, loading: false, error: true }
    case REQ_ACTION.LOADED:
      return { ...state, loading: false }
    default:
      throw new Error('No existe esa accion')
  }
}

function modalReducer (state, action) {
  switch (action) {
    case MODALS.OPEN_BOARD_SETTINGS:
      return { ...modalStates, settings: !state.settings }
    case MODALS.OPEN_MINI_MENU:
      return { ...modalStates, mini_menu: !state.mini_menu }
    case MODALS.OPEN_BOARD_EDIT:
      return { ...modalStates, edit: true }
    case MODALS.OPEN_EDIT_TASK:
      return { ...modalStates, edit_task: true }
    case MODALS.OPEN_BOARD_DELETE:
      return { ...modalStates, delete: true }
    case MODALS.OPEN_NEW_BOARD_MODAL:
      return { ...modalStates, side_menu: false, new_board: true }
    case MODALS.OPEN_SIDE_MENU:
      return { ...modalStates, tablet_btn_bottom: false, side_menu: true }
    case MODALS.OPEN_TASK_DETAILS:
      return { ...modalStates, task_details: true }
    case MODALS.OPEN_NEW_TASK:
      return { ...modalStates, new_task: true }
    case MODALS.CLOSE_SIDE_MENU:
      return { ...modalStates, side_menu: false }
    case MODALS.CLOSE_ALL_MODALS:
      return modalStates
    default:
      throw new Error('No existe esa accion')
  }
}

export {
  modalStates,
  initialRequestState,
  MODALS,
  REQ_ACTION,
  USER_CONFIG,
  modalReducer,
  requestReducer
}
