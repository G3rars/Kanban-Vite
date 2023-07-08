import React from 'react'

export default function Card ({ data, handleViewTask }) {
  const TOTAL = data.subTask.length
  const COMPLETED = data.subTask.filter(item => item.completed).length
  return (
    <>
      <article
        onClick={() => handleViewTask(data._id)}
        className='mt-6 cursor-pointer rounded-md bg-kwhite shadow-lg duration-300 hover:bg-kcian'
      >
        <div className='p-4 font-bold'>{data.title}</div>
        <div className='pb-3 pl-4 text-sm font-bold'>{`${TOTAL} de ${COMPLETED} Subtask`}</div>
      </article>
    </>
  )
}
