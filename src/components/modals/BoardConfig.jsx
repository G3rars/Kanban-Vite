import React from 'react'

function BoardConfig ({ openDeleteBoard, openEditBoard }) {
  return (
    <div className='grid h-full w-full justify-start gap-4 rounded-md bg-kwhite p-4 pl-6 dark:bg-kblackli'>
      <button onClick={openEditBoard} className='text-left text-md font-medium leading-6 text-kgrayli hover:cursor-pointer hover:text-kgray dark:text-kgrayli/70 dark:hover:text-kgrayli'>Edit Board</button>
      <button onClick={openDeleteBoard} className='text-left text-md font-medium leading-6 text-kred/70 hover:cursor-pointer hover:text-kred'>Delete Board</button>
    </div>
  )
}

export { BoardConfig }
