import React, { useState } from 'react'
import { CardModal } from './cardModal.jsx'
import NewBoardModal from './NewBoardModal.jsx'
import { createPortal } from 'react-dom'

export default function TabletModal ({ handleClick, modalTable, data }) {
  const transition = modalTable ? 'enter' : 'exit'
  const [modalBoard, setBoardModal] = useState(false)
  const newBoard = () => {
    setBoardModal(prevState => !prevState)
    handleClick()
  }

  return (
    <>
      {modalBoard && createPortal(<NewBoardModal event={newBoard} />, document.body)}
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
              <CardModal color={'text-black'} hover={'text-kwhite'} key={item.board_id}>{item.board_name}</CardModal>
            ))
          }
          <CardModal key={'initialCardModal'} event={newBoard} color={'text-kpurple'}>+Add new board</CardModal>
        </div>

        <div className='rounded-md mt-auto h-32 flex justify-center items-center'>
          <div className='bg-kcian w-64 h-12' />
        </div>

      </div>
      <div onClick={handleClick} className={`bg-black w-full ${modalTable ? 'opacity-30' : 'hidden'} h-full absolute z-10`} />
    </>
  )
}
