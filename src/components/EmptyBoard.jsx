import React from 'react'
import Button from './button'

export default function EmptyBoard ({ activeBoard, event }) {
  return (
    <div className='mx-auto flex h-full flex-col place-content-center items-center justify-center gap-6'>
    {!activeBoard ?? true ? <img className= 'w-1/2 md:w-full' src="styles/assets/logo-dark.svg" alt="logo-dark.svg" /> : ''}
      <p className='text-center text-base font-bold text-[#828FA3]'>{!activeBoard ?? true ? 'Welcome to kanban, to start create a new board' : 'This board is empty. Create a new column to get started'}</p>
      <div className='flex items-center justify-center'><Button event={event} style='primarylg' size={'w-[200px]'}>{!activeBoard ?? true ? '+Add New Board' : '+ Add New Column'}</Button></div>
    </div>
  )
}

export { EmptyBoard }
