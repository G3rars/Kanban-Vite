import React from 'react'
import Button from './button'
import { BoardConfig } from './modals/BoardConfig'
import { LogoMobile, LogoDesktop } from './icons/Logos'
import { ArrowDown, ArrowUp } from './icons/Arrows'
import { IconPlus, IconThreeDots } from './icons/Symbols'

export default function HeaderComp ({ openSideMenu, states, openBoardSettings, openDeleteBoard, openEditBoard, data, addTask, openMiniMenu }) {
  return (
    <nav className='relative flex h-[64px] w-full flex-row justify-between pr-7 shadow-md transition duration-500 dark:bg-kdarkGray md:h-[80px] lg:h-[96px]'>
      <div className='mx-4 flex items-center justify-center border-solid border-kcian pr-4 dark:border-kdarkGray md:border-r'>
        <LogoMobile />
        <LogoDesktop event={openSideMenu} />
      </div>
      {/*
        // ! Open mini menu
      */}
      <div className='mr-auto flex items-center text-xl font-bold dark:text-kwhite'>
      {
        data && (
          <>
            <button onClick={openMiniMenu} className='flex items-center gap-3 md:hidden'>
              <p>{data.board_name}</p>
              { !states.mini_menu
                ? <ArrowDown />
                : <ArrowUp />
              }
            </button>
            <p className='hidden md:block'>{data.board_name}</p>
          </>
        )
      }
      </div>

      <div className='ml-2 flex items-center justify-center'>
        <Button event={addTask} style='primarylg' size='md:hidden max-w-[48px] max-h-[32px] grid place-content-center rounded-full'>
          <IconPlus />
        </Button>
        <Button event={addTask} style='primarylg' size='hidden md:grid place-content-center max-w-[295px]'>+add new task</Button>

        <button className='ml-3 flex h-6 w-3 cursor-pointer justify-center' onClick={openBoardSettings}>
          <IconThreeDots />
        </button>
        {
            states.settings && (
              <div className='absolute right-8 top-14 z-30 h-24 w-48 rounded-md bg-kwhite shadow-lg dark:bg-kblackli md:top-16 lg:top-20'>
                <BoardConfig
                key='headerMiniModal'
                  remove={openDeleteBoard}
                  edit={openEditBoard}
                  content={{ top: 'Edit board', down: 'Delete board' }}
                />
              </div>
            )
          }
      </div>
    </nav>
  )
}
