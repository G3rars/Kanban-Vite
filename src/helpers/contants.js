const initialModalsState = {
  settings: false,
  delete: false,
  edit: false,
  new_board: false,
  side_menu: false,
  task_details: false,
  new_task: false
}

const ACTIONS = {
  OPEN_BOARD_SETTINGS: 'openBoardSettings',
  OPEN_BOARD_EDIT: 'openBoardEdit',
  OPEN_BOARD_DELETE: 'openBoardDelete',
  OPEN_NEW_BOARD_MODAL: 'openNewBoardModal',
  OPEN_SIDE_MENU: 'openSideMenu',
  OPEN_TASK_DETAILS: 'openTaskDetails',
  OPEN_NEW_TASK: 'openMewTask',
  CLOSE_SIDE_MENU: 'closeSideMenu',
  CLOSE_NEW_BOARD_MODAL: 'closeNewBoardModal',
  CLOSE_ALL_MODALS: 'closeAll'
}

export {
  initialModalsState,
  ACTIONS
}
