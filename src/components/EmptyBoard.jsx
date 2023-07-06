import React from 'react'
import Button from './button'

export default function EmptyBoard () {
  return (
    <div className='mx-auto grid h-full w-2/3 place-content-center justify-center gap-6'>
      <p className='text-center text-base font-bold text-[#828FA3]'>This board is empty. Create a new column to get started.</p>
      <div className='flex items-center justify-center'><Button style='primarylg' size={'w-[174px]'}>+ Add New Column</Button></div>
    </div>
  )
}

export { EmptyBoard }
