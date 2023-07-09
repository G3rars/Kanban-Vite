import React from 'react'

export default function Card ({ data, handleViewTask }) {
  const TOTAL = data.subTask.length
  const COMPLETED = data.subTask.filter(item => item.completed).length

  return (
    <>
      <article
        onClick={() => handleViewTask(data._id)}
        className='mt-6 cursor-pointer rounded-md bg-kwhite shadow-lg transition duration-500 hover:bg-kcian dark:bg-kdarkGray'
      >
        <p className='p-4 font-bold tracking-wider dark:text-kwhite'>{data.title}</p>
        <p className='pb-3 pl-4 text-sm font-bold dark:text-kgrayli'>{`${TOTAL} de ${COMPLETED} Subtask`}</p>
      </article>
    </>
  )
}
