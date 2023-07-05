import React, { useContext } from 'react'
import { CardModal } from './cardModal.jsx'
import { ThemeContext } from '../../context/ThemeContext.jsx'

export default function TabletModal ({ close, modalTable, data, setBoardModal, changeBoard }) {
  const { darkTheme } = useContext(ThemeContext)
  const transition = modalTable.side_menu ? 'enter' : 'exit'

  return (
    <>
      <aside className={`${transition} absolute bg-kwhite h-full w-[300px] shadow-md z-20 flex flex-col`}>
        <div className='p-8'>
          <img src='styles/assets/logo-dark.svg' alt='' />
        </div>

        <p className='font-bold text-md opacity-60 ml-6 uppercase tracking-wide'>
          all Board
        </p>

        <div>
          {
            Array.isArray(data) && data.map((item) => (
              <CardModal
                changeBoard={changeBoard}
                color={'text-black'}
                hover={'text-kwhite'}
                keyData={item.board_id}
                key={item.board_id}
              >
                {item.board_name}
              </CardModal>
            ))
          }
          <CardModal
            key={'initialCardModal'}
            changeBoard={changeBoard}
            event={setBoardModal}
            color={'text-kpurple'}
          >
            +Add new board
          </CardModal>
        </div>

        <div className='rounded-md mt-auto mx-auto flex justify-center items-center gap-4 bg-kcian w-64 h-12 mb-4'>
          <img width="19" height="19" src="/styles/assets/icon-light-theme.svg" alt="icon-light-theme.svg" />
         <ThemeSwitch />
         <img width="19" height="19" src="/styles/assets/icon-dark-theme.svg" alt="icon-dark-theme.svg" />
        </div>

        <button onClick={close} className='mb-12 pl-6 h-12 mr-6 flex gap-3 items-center hover:bg-kcianli rounded-e-full group'>
          <svg className='fill-kgrayli group-hover:fill-kpurple' width="18" height="16" viewBox='0 0 18 16' xmlns="http://www.w3.org/2000/svg">
            <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
          </svg>
          <p className='text-base font-medium leading-normal text-kgrayli group-hover:text-kpurple'>Hide Sidebar</p>
        </button>
      </aside>
      <div onClick={close} className={`bg-kblack w-full ${modalTable.side_menu ? 'opacity-30' : 'hidden'} h-full absolute z-10`} />
    </>
  )
}

function ThemeSwitch () {
  return (
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative group">
          <input type="checkbox" id="toggleB" className="sr-only peer" />
          <div className="block bg-kpurple w-10 h-5 rounded-full group-hover:bg-opacity-80"></div>
          <div className="dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
        </div>
      </label>
  )
}
