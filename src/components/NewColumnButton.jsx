import React from 'react'

function NewColumnButton ({ event }) {
  return (
    <>
        <button
          onClick={event}
          className='group flex h-[80vh] w-screen min-w-[250px] max-w-[280px] cursor-pointer items-center justify-center rounded-lg bg-kcian/60 duration-300 hover:bg-kcian dark:bg-kdarkGray/30 dark:hover:bg-kdarkGray/70'
        >
                <p className='text-2xl font-extrabold text-kgrayli group-hover:text-kpurple dark:group-hover:text-kpurple/90'>+New Column</p>
        </button>
    </>
  )
}

export { NewColumnButton }
