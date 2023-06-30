import React from 'react'

export default function SubTaskCard ({ handleRemoveColumn, columnState }) {
  const handleInputChange = (event) => {
    const value = event.target.value
    columnState(value)
  }
  return (
    <>
      <div className='flex pb-2'>
        <input
          className='w-full h-10 pl-4 py-2 text-sm border-solid border-kgrayli border-[1px] rounded border-opacity-25 outline-kpurple'
          placeholder='e.g. Make coffee'
          type='text'
          onChange={handleInputChange}
        />
        <div className='flex justify-center items-center pl-5'>
          <img onClick={handleRemoveColumn} className='h-[14px] w-[14px] cursor-pointer' src='/styles/assets/icon-cross.svg' alt='icon-cross.svg' />
        </div>
      </div>
    </>
  )
}
