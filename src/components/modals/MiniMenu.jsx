import React from 'react'
import { CardModal } from './cardModal'
import { ThemeSwitch } from '../SwitchTheme'

function MiniMenu ({ data, setBoardModal, changeBoard, changeTheme, activeBoard }) {
  const totalBoards = Array.isArray(data) && data.length
  // console.log(data)

  return (
    <aside onClick={(e) => e.stopPropagation()} className='w-screen max-w-[265px] min-h-[325px] grid bg-kwhite rounded-md'>
        <p className='py-4 pl-7 font-bold text-md opacity-60 uppercase tracking-wide dark:text-kwhite'>
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
          <div className='rounded-md mx-auto mt-3 flex justify-center items-center gap-4 bg-kcian w-64 min-h-[48px] mb-3 transition duration-500 dark:bg-kblackli'>
            <img width="19" height="19" src="/styles/assets/icon-light-theme.svg" alt="icon-light-theme.svg" />
              <ThemeSwitch changeTheme={changeTheme} />
            <img width="19" height="19" src="/styles/assets/icon-dark-theme.svg" alt="icon-dark-theme.svg" />
          </div>
    </aside>
  )
}

export default MiniMenu
