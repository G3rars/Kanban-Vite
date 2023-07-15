import React from 'react'

function Card ({ data, handleViewTask }) {
  const TOTAL = data?.subTask?.length || 0
  const COMPLETED = data?.subTask?.filter(item => item.completed)?.length || 0

  return (
    <>
      <article
        onClick={() => handleViewTask(data._id)}
        className='cursor-pointer rounded-md bg-kwhite shadow-lg transition duration-500 hover:bg-kcian dark:bg-kdarkGray'
      >
        <p className='p-4 font-bold tracking-wider dark:text-kwhite'>{data.title}</p>
        <p className='pb-3 pl-4 text-sm font-bold dark:text-kgrayli'>{`${COMPLETED} of ${TOTAL}  Subtask`}</p>
      </article>
    </>
  )
}

export { Card }
