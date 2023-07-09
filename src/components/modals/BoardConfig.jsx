import React from 'react'

function BoardConfig ({ openDeleteBoard, openEditBoard }) {
  return (
    <div className='grid h-full w-full justify-start gap-4 p-4 pl-6'>
      <button onClick={openEditBoard} className='text-left text-md font-medium leading-6 text-kgrayli hover:cursor-pointer hover:text-kgray'>Edit</button>
      <button onClick={openDeleteBoard} className='text-left text-md font-medium leading-6 text-kredli hover:cursor-pointer hover:text-kred'>Delete</button>
    </div>
  )
}

export { BoardConfig }
