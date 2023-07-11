const initialModalsState = {
  settings: false,
  delete: false,
  edit: false,
  new_board: false,
  side_menu: false,
  task_details: false,
  new_task: false,
  tablet_btn_bottom: true,
  mini_menu: false
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
      return { ...state, settings: !state.settings }
    case MODALS.OPEN_MINI_MENU:
      return { ...state, mini_menu: !state.mini_menu }
    case MODALS.OPEN_BOARD_EDIT:
      return { ...state, settings: false, edit: true }
    case MODALS.OPEN_BOARD_DELETE:
      return { ...state, settings: false, delete: true }
    case MODALS.OPEN_NEW_BOARD_MODAL:
      return { ...state, settings: false, side_menu: false, new_board: true }
    case MODALS.OPEN_SIDE_MENU:
      return { ...state, settings: false, tablet_btn_bottom: false, side_menu: true }
    case MODALS.OPEN_TASK_DETAILS:
      return { ...state, settings: false, task_details: true }
    case MODALS.OPEN_NEW_TASK:
      return { ...state, settings: false, new_task: true }
    case MODALS.CLOSE_SIDE_MENU:
      return { ...state, side_menu: false }
    case MODALS.CLOSE_ALL_MODALS:
      return initialModalsState
    default:
      throw new Error('No existe esa accion')
  }
}

export {
  initialModalsState,
  initialRequestState,
  MODALS,
  REQ_ACTION,
  modalReducer,
  requestReducer
}
