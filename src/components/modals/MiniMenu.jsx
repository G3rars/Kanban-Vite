import React from 'react'
import { CardModal } from './cardModal'
import { ThemeSwitch } from '../SwitchTheme'
import { IconLigthTheme, IconDarkTheme } from '../icons/Symbols'

function MiniMenu ({ data, setBoardModal, changeBoard, changeTheme, activeBoard, darkTheme }) {
  const totalBoards = Array.isArray(data) && data.length

  return (
    <aside onClick={e => e.stopPropagation()} className='grid max-h-[500px] min-h-[325px] w-screen max-w-[300px] overflow-scroll rounded-md bg-kwhite transition duration-500 dark:bg-kdarkGray'>
        <p className='py-4 pl-7 text-md font-bold uppercase tracking-wide opacity-60 dark:text-kwhite'>
          all Board ({totalBoards})
        </p>

        <div className='h-80 overflow-y-scroll'>
          {
            Array.isArray(data) && data.map((item) => (
              <CardModal
                event={changeBoard}
                keyData={item._id}
                key={item._id}
                content={item.name}
                type={item._id === activeBoard._id ? 'active' : 'inactive'}
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
          <div className='mx-auto my-3 flex h-12 w-full max-w-[235px] items-center justify-center gap-4 rounded-md bg-kcian dark:bg-kblackli'>
            <IconLigthTheme />
              <ThemeSwitch darkTheme={darkTheme} changeTheme={changeTheme} />
            <IconDarkTheme />
          </div>
    </aside>
  )
}

export default MiniMenu
