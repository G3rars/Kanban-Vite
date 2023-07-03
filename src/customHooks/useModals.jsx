import { useReducer } from 'react'

import {
  initialModalsState as initialState,
  ACTIONS
} from '../helpers/contants'

function reducer (state, action) {
  switch (action) {
    case ACTIONS.OPEN_BOARD_SETTINGS:
      return { ...state, settings: true }
    case ACTIONS.OPEN_BOARD_EDIT:
      return { ...state, settings: false, edit: true }
    case ACTIONS.OPEN_BOARD_DELETE:
      return { ...state, settings: false, delete: true }
    case ACTIONS.OPEN_NEW_BOARD_MODAL:
      return { ...state, side_menu: false, new_board: true }
    case ACTIONS.OPEN_SIDE_MENU:
      return { ...state, side_menu: true }
    case ACTIONS.OPEN_TASK_DETAILS:
      return { ...state, task_details: true }
    case ACTIONS.OPEN_NEW_TASK:
      return { ...state, new_task: true }
    case ACTIONS.CLOSE_SIDE_MENU:
      return { ...state, side_menu: false }
    case ACTIONS.CLOSE_ALL_MODALS:
      return initialState
    default:
      throw new Error('No existe esa accion')
  }
}

function useModals () {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

export { useModals }
