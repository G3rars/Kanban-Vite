const initialSettingsState = {
  settings: false,
  delete: false,
  edit: false,
  new_board: false,
  side_menu: false
}

const ACTIONS = {
  OPEN_BOARD_SETTINGS: 'openBoardSettings',
  OPEN_BOARD_EDIT: 'openBoardEdit',
  OPEN_BOARD_DELETE: 'openBoardDelete',
  OPEN_NEW_BOARD_MODAL: 'openNewBoardModal',
  OPEN_SIDE_MENU: 'openSideMenu',
  CLOSE_SIDE_MENU: 'closeSideMenu',
  CLOSE_NEW_BOARD_MODAL: 'closeNewBoardModal',
  CLOSE_ALL_MODALS: 'closeAll'
}

export {
  initialSettingsState,
  ACTIONS
}
