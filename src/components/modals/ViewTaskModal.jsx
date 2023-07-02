/* eslint-disable react/no-unescaped-entities */
import React from 'react'

function Subtask ({ id, content }) {
  return (
    <div className='w-full min-h-[60px] bg-kcianli rounded flex items-center gap-4 p-3'>
      <input
        type='checkbox'
        name='subtasks'
        id={id}
        className='form-checkbox text-kpurple h-4 w-4 peer'
      />
      <label htmlFor={id} className='text-sm text-kblack leading-normal font-bold peer-checked:opacity-30 peer-checked:line-through'>{content.name}</label>
    </div>
  )
}

export default function ViewTaskModal ({ setActiveTask, dataTask, activeBoard }) {
  const handleCloseTask = () => {
    setActiveTask(prevState => !prevState)
  }

  console.log(activeBoard.board_columns)
  return (
    <div className='absolute h-[100svh] w-screen bg-black grid place-content-center bg-opacity-30 z-40'>
      <article className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[560px] p-6 rounded-md flex flex-col gap-6'>
        <div className='flex justify-between items-center gap-6'>
          <h3 className='text-lg font-bold text-kblack'>{dataTask.title}</h3>
          <img onClick={handleCloseTask} className='cursor-pointer' src="/styles/assets/icon-cross.svg" alt="" />
          <img width={5} height={20} className='cursor-pointer h-5 w-2' src='/styles/assets/icon-vertical-ellipsis.svg' alt='icon-vertical-ellipsis.svg' />
        </div>
        <div className='w-full'>
          <p className='text-sm font-normal text-kgrayli leading-6'>{dataTask.description}</p>
        </div>
        <form className='grid gap-2'>
          <p className='text-sm font-bold text-kgrayli mb-2'>Subtasks (2 of 3)</p>
          {
            dataTask.subTask && dataTask.subTask.map((value) => <Subtask key={value._id} content={value}/>)
          }
          <p className='text-sm font-bold text-kgrayli mt-4'>Current Status</p>
          <select name='status' className='form-select w-full h-[40px] border-solid border-kgrayli border-[1px] rounded-md border-opacity-25 mb-5'>
            <option value=''>Selecciona una opción</option>
            {
              activeBoard && activeBoard.board_columns.map(value => (<option key={value._id}>{value.name}</option>))
            }
          </select>
        </form>
      </article>
    </div>
  )
}
