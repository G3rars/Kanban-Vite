import React from 'react'
import { Button } from './button'
import { LogoDesktop } from '../icons/Logos'

function EmptyBoard ({ activeBoard, event }) {
  return (
    <div className='mx-auto flex h-full flex-col place-content-center items-center justify-center gap-6'>
      {!activeBoard && <LogoDesktop />}
      <p className='text-center text-base font-bold text-kgrayli'>
        {!activeBoard
          ? 'Welcome to kanban, to start create a new board'
          : 'This board is empty. Create a new column to get started'
        }
      </p>
      <div className='flex items-center justify-center'>
        <Button event={event} style='primarylg' size={'w-[200px]'}>
          {!activeBoard ? '+Add New Board' : '+ Add New Column'}
        </Button>
      </div>
    </div>
  )
}

export { EmptyBoard }
