import React from 'react'

export default function Card ({ data, handleViewTask }) {
  const task = data.subTask.length
  return (
    <>
      <article
        onClick={() => handleViewTask(data._id)}
        className='mt-6 cursor-pointer rounded-md bg-kwhite shadow-lg duration-300 hover:bg-kcian'
      >
        <div className='p-4 font-bold'>{data.title}</div>
        <div className='pb-3 pl-4 text-sm font-bold'>{`0 de ${task} Subtask`}</div>
      </article>
    </>
  )
}
