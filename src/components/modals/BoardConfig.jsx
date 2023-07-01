import React from 'react'

function BoardConfig ({ openDeleteBoard }) {
  return (
    <div className='grid gap-4 p-4 h-full w-full justify-start'>
      <button className='text-md font-medium leading-6 text-kgrayli hover:cursor-pointer hover:text-kgray'>Edit Board</button>
      <button onClick={openDeleteBoard} className='text-md font-medium leading-6 text-kredli hover:cursor-pointer hover:text-kred'>Delete Board</button>
    </div>
  )
}

export { BoardConfig }
