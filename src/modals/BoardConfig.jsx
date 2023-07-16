import React from 'react'

function BoardConfig ({ remove, edit, content }) {
  return (
    <div className='grid h-full w-full justify-start gap-4 rounded-md bg-kwhite p-4 pl-6 dark:bg-kblackli'>
      <button onClick={edit} className='text-left text-md font-medium leading-6 text-kgrayli hover:cursor-pointer hover:text-kgray dark:text-kgrayli/70 dark:hover:text-kgrayli'>{content.top}</button>
      <button onClick={remove} className='text-left text-md font-medium leading-6 text-kred/70 hover:cursor-pointer hover:text-kred'>{content.down}</button>
    </div>
  )
}

export { BoardConfig }
