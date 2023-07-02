import React from 'react'

export default function Card ({ data, handleViewTask }) {
  const task = data.subTask.length
  return (
    <>
      <section onClick={() => handleViewTask(data._id)} className='bg-kwhite shadow-lg rounded-md mt-6 cursor-pointer hover:bg-kcian duration-300'>
        <div className='font-bold p-4'>{data.title}</div>
        <div className='text-sm pl-4 pb-3 font-bold'>{`0 de ${task} Subtask`}</div>
      </section>
    </>
  )
}
