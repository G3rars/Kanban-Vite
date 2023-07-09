import React from 'react'
import { IconCross } from './icons/Symbols'

export default function SubTaskCard ({ handleDeleteColumn, colID, inputName, defValue = '', required = false }) {
  return (
    <>
      <div className='group flex pb-2'>
        <input
          className='h-10 w-full rounded border-solid border-kgrayli/30 py-2 pl-4 text-sm outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite'
          placeholder='e.g. Make coffee'
          type='text'
          required={required}
          name={inputName}
          defaultValue={defValue}
        />
        <button onClick={() => handleDeleteColumn(colID)} className='flex h-10 items-center justify-center pl-5'>
          <IconCross />
        </button>
      </div>
    </>
  )
}
