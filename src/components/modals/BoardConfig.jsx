import React from 'react'

function BoardConfig () {
  return (
    <div className='grid gap-4 p-4 h-full w-full justify-start'>
      <button className='text-md font-medium leading-6 text-kgrayli hover:cursor-pointer hover:text-kgray'>Edit Board</button>
      <button className='text-md font-medium leading-6 text-kredli hover:cursor-pointer hover:text-kred'>Delete Board</button>
    </div>
  )
}

export { BoardConfig }
