import React from 'react'

function BoardConfig ({ openDeleteBoard, openEditBoard }) {
  return (
    <div className='grid gap-4 p-4 pl-6 h-full w-full justify-start'>
      <button onClick={openEditBoard} className='text-left text-md font-medium leading-6 text-kgrayli hover:cursor-pointer hover:text-kgray'>Edit Board</button>
      <button onClick={openDeleteBoard} className='text-left text-md font-medium leading-6 text-kredli hover:cursor-pointer hover:text-kred'>Delete Board</button>
    </div>
  )
}

export { BoardConfig }
