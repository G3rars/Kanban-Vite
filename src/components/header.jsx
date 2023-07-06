import React from 'react'
import Button from './button'
import { BoardConfig } from './modals/BoardConfig'

export default function HeaderComp ({ openSideMenu, states, openBoardSettings, openDeleteBoard, openEditBoard, data, addTask, openMiniMenu }) {
  return (
    <nav className='w-full h-[64px] flex flex-row shadow-md lg:h-[96px] md:h-[80px] justify-between pr-7 relative dark:bg-kdarkGray'>
      <div className='mx-4 pr-4 flex items-center justify-center md:border-r border-solid border-opacity-10 border-kpurple'>
        <img className='md:hidden' width={34} height={35} src='/styles/assets/logo-mobile.svg' alt='logo-mobile.svg' />
        <img onClick={openSideMenu} className='hidden md:block cursor-pointer' src='/styles/assets/logo-dark.svg' width={153} height={26} alt='logo-dark.svg' />
      </div>

      <div className='flex items-center font-bold text-xl mr-auto'>
      {
        data && (
          <button onClick={openMiniMenu} className='flex items-center gap-3 md:hidden'>
            <p>{data.board_name}</p>
            { !states.mini_menu
              ? <img width="10" height="7" src="/styles/assets/icon-chevron-down.svg" alt="arrow pointing down" />
              : <img width="10" height="7" src="/styles/assets/icon-chevron-up.svg" alt="arrow pointing up" />
            }
          </button>)
      }
      {
        data && <p className='hidden md:block'>{data.board_name}</p>
      }
      </div>

      <div className='flex content-center items-center ml-2'>

        <Button event={addTask} style='primarylg' size='md:hidden h-10 max-w-[48px] max-h-[32px] grid place-content-center rounded-full'><img width={14} height={14} src='styles/assets/icon-add-task-mobile.svg' alt='icon-add-task-mobile.svg' /></Button>
        <Button event={addTask} style='primarylg' size='hidden md:block h-10 max-w-[295px]'>+add new task</Button>

        <div className='ml-3 w-3 h-6 flex justify-end' onClick={openBoardSettings}>
          <img width={5} height={20} className='cursor-pointer' src='/styles/assets/icon-vertical-ellipsis.svg' alt='icon-vertical-ellipsis.svg' />
        </div>
        {
            states.settings && (
              <div className='h-24 w-48 bg-kwhite shadow-lg absolute right-8 top-14 rounded-md z-30 md:top-16 lg:top-20'>
                <BoardConfig openDeleteBoard={openDeleteBoard} openEditBoard={openEditBoard} />
              </div>
            )
          }
      </div>
    </nav>
  )
}
