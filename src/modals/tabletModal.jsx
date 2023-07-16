import React from 'react'
import { CardModal } from './cardModal'
import { ThemeSwitch } from '../components/SwitchTheme'
import { IconLigthTheme, IconDarkTheme, IconHideSidebar } from '../icons/Symbols'
import { LogoDesktop } from '../icons/Logos'

function TabletModal ({ close, modalTable, data, setBoardModal, changeBoard, changeTheme, activeBoard, darkTheme }) {
  const totalBoards = Array.isArray(data) && data.length
  return (
    <>
      <aside className={`${modalTable.side_menu ? 'translate-x-0' : '-translate-x-full'} absolute z-20 flex h-full w-[300px] flex-col bg-kwhite shadow-md transition duration-500 dark:bg-kdarkGray dark:text-kgrayli`}>
        <div className='p-8'>
          <LogoDesktop />
        </div>

        <p className='mb-3 pl-7 text-md font-bold uppercase tracking-wide opacity-60 dark:text-kwhite'>
          all Board ({totalBoards})
        </p>

        <div className='overflow-y-auto'>
          {
            Array.isArray(data) && activeBoard && data.map((item) => (
              <CardModal
                event={changeBoard}
                keyData={item._id}
                key={item._id}
                type={item._id === activeBoard._id ? 'active' : 'inactive'}
                content={item.name}
              />)
            )
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
          <div className='mx-auto mb-3 mt-auto flex min-h-[48px] w-64 items-center justify-center gap-4 rounded-md bg-kcian transition duration-500 dark:bg-kblackli'>
            <IconLigthTheme />
              <ThemeSwitch changeTheme={changeTheme} darkTheme={darkTheme} />
            <IconDarkTheme />
          </div>

        {/*
          // ! Hide Sidebar
        */}
        <button onClick={close} className='group mb-12 flex h-12 items-center gap-3 rounded-e-full pl-7 hover:bg-kcianli'>
          <IconHideSidebar />
          <p className='text-base font-medium leading-normal text-kgrayli group-hover:text-kpurple'>Hide Sidebar</p>
        </button>
      </aside>
      <div onClick={close} className={`w-full bg-kblack ${modalTable.side_menu ? 'opacity-30' : 'hidden'} absolute z-10 h-full`} />
    </>
  )
}

export { TabletModal }
