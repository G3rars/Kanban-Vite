import React from 'react'
import { CardModal } from './cardModal.jsx'

export default function TabletModal ({ handleClick, modalTable, data, setBoardModal, changeBoard }) {
  const transition = modalTable ? 'enter' : 'exit'

  return (
    <>
      <div className={`${transition} absolute bg-kwhite h-full w-[300px] shadow-md z-20 flex flex-col`}>
        <div className='p-8'>
          <img src='styles/assets/logo-dark.svg' alt='' />
        </div>

        <div className='font-bold text-md opacity-60 ml-6 uppercase tracking-wide'>
          all Board
        </div>

        <div>
          {
            Array.isArray(data) && data.map((item) => (
              <CardModal changeBoard={changeBoard} color={'text-black'} hover={'text-kwhite'} keyData={item.board_id} key={item.board_id}>{item.board_name}</CardModal>
            ))
          }
          <CardModal key={'initialCardModal'} changeBoard={changeBoard} event={setBoardModal} color={'text-kpurple'}>+Add new board</CardModal>
        </div>

        <div className='rounded-md mt-auto h-32 flex justify-center items-center'>
          <div className='bg-kcian w-64 h-12' />
        </div>

      </div>
      <div onClick={handleClick} className={`bg-black w-full ${modalTable ? 'opacity-30' : 'hidden'} h-full absolute z-10`} />
    </>
  )
}
