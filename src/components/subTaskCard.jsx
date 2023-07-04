import React from 'react'

export default function SubTaskCard ({ handleDeleteColumn, colID, inputName, defValue }) {
  return (
    <>
      <div className='flex pb-2'>
        <input
          className='w-full h-10 pl-4 py-2 text-sm border-solid border-kgrayli border-[1px] rounded border-opacity-25 outline-kpurple'
          placeholder='e.g. Make coffee'
          type='text'
          name={inputName}
          defaultValue={defValue}
        />
        <div className='flex justify-center h-10 items-center pl-5'>
          <img onClick={() => handleDeleteColumn(colID)} className='h-[14px] w-[14px] cursor-pointer' src='/styles/assets/icon-cross.svg' alt='icon-cross.svg' />
        </div>
      </div>
    </>
  )
}
