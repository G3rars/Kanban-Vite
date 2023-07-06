import React from 'react'
import { CardModal } from './cardModal'
import { ThemeSwitch } from '../SwitchTheme'

function MiniMenu ({ data, setBoardModal, changeBoard, changeTheme, activeBoard }) {
  const totalBoards = Array.isArray(data) && data.length
  // console.log(data)

  return (
    <aside onClick={(e) => e.stopPropagation()} className='grid min-h-[325px] w-screen max-w-[265px] rounded-md bg-kwhite'>
        <p className='py-4 pl-7 text-md font-bold uppercase tracking-wide opacity-60 dark:text-kwhite'>
          all Board ({totalBoards})
        </p>

        <div className='overflow-y-auto'>
          {
            Array.isArray(data) && data.map((item) => (
              <CardModal
                event={changeBoard}
                keyData={item.board_id}
                key={item.board_id}
                content={item.board_name}
                type={item.board_id === activeBoard.board_id ? 'active' : 'inactive'}
              />
            ))
          }
        </div>
        <CardModal
            changeBoard={changeBoard}
            event={setBoardModal}
            key='initialCardModal'
            type='special'
            content='+ Create new board'
          />

          {/*
           // ! Swich Theme
          */}
          <div className='mx-auto my-3 flex min-h-[48px] w-64 items-center justify-center gap-4 rounded-md bg-kcian transition duration-500 dark:bg-kblackli'>
            <img width="19" height="19" src="/styles/assets/icon-light-theme.svg" alt="icon-light-theme.svg" />
              <ThemeSwitch changeTheme={changeTheme} />
            <img width="19" height="19" src="/styles/assets/icon-dark-theme.svg" alt="icon-dark-theme.svg" />
          </div>
    </aside>
  )
}

export default MiniMenu
