import React, { useState } from 'react'
import { Subtask } from '../SubTask'
import { BoardConfig } from './BoardConfig'

// TODO: setActiveTask no es usado en ningun lado
export default function ViewTaskModal ({ setActiveTask, dataTask, activeBoard }) {
  const [modal, setModal] = useState(false)

  function taskOptions () {
    setModal(prevState => !prevState)
  }

  const TOTAL = dataTask.subTask.length
  const COMPLETED = dataTask.subTask.filter(item => item.completed).length

  return (
    <article
      onClick={e => e.stopPropagation()}
      className='relative flex min-h-[560px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 md:max-w-[480px]'
    >
      <div className='flex max-h-fit items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack'>{dataTask.title}</h3>
        <div className='flex h-10 w-5 items-center justify-end' onClick={taskOptions}>
          <img width={5} height={20} className='cursor-pointer' src='/styles/assets/icon-vertical-ellipsis.svg' alt='icon-vertical-ellipsis.svg' />
        </div>
      </div>
      <div className='min-h-[40px]'>
        <p className='text-sm font-normal leading-6 text-kgrayli'>{dataTask.description}</p>
      </div>
      <form className='flex h-full flex-col justify-between gap-2'>
        <div className='grid gap-2'>
        <label className='mb-2 text-sm font-bold text-kgrayli'>Subtasks ({COMPLETED} of {TOTAL})</label>
          {
            dataTask.subTask &&
              dataTask.subTask.map((value) => <Subtask key={value._id} id={value._id} content={value} check={value.completed} />)
          }
        </div>
        <div className='grid gap-2'>
          <label htmlFor='status' className='mt-4 text-sm font-bold text-kgrayli'>Current Status</label>
          <select name='status' className='form-select h-[40px] w-full rounded-md border-[1px] border-solid border-kgrayli/30'>
            {
              activeBoard &&
                activeBoard.board_columns.map(value => (<option key={value._id}>{value.name}</option>))
                // TODO: colocar como primera opcion del select la columna a la cual pertenece la tarea
            }
          </select>
        </div>
      </form>
      {
        modal && (
          <div className='absolute -right-8 top-16 z-30 h-24 w-40 rounded-md bg-kwhite shadow-lg md:top-16 md:w-48 lg:top-20'>
            <BoardConfig />
          </div>
        )
      }
    </article>
  )
}
