import React from 'react'

export default function SubTaskCard ({ handleDeleteColumn, colID, inputName, defValue = '', required = false }) {
  return (
    <>
      <div className='flex pb-2'>
        <input
          className='h-10 w-full rounded border-solid border-kgrayli/30 py-2 pl-4 text-sm outline-kpurple'
          placeholder='e.g. Make coffee'
          type='text'
          required={required}
          name={inputName}
          defaultValue={defValue}
        />
        <div className='flex h-10 items-center justify-center pl-5'>
          <img onClick={() => handleDeleteColumn(colID)} className='h-[14px] w-[14px] cursor-pointer' src='/styles/assets/icon-cross.svg' alt='icon-cross.svg' />
        </div>
      </div>
    </>
  )
}
