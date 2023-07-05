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
      className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[560px] p-6 rounded-md flex flex-col gap-6 relative'
    >
      <div className='flex justify-between items-center max-h-fit'>
        <h3 className='text-lg font-bold text-kblack'>{dataTask.title}</h3>
        <div className='w-5 h-10 flex justify-end items-center' onClick={taskOptions}>
          <img width={5} height={20} className='cursor-pointer' src='/styles/assets/icon-vertical-ellipsis.svg' alt='icon-vertical-ellipsis.svg' />
        </div>
      </div>
      <div className=''>
        <p className='text-sm font-normal text-kgrayli leading-6'>{dataTask.description}</p>
      </div>
      <form className='flex flex-col gap-2 h-full justify-between'>
        <label className='text-sm font-bold text-kgrayli mb-2'>Subtasks ({COMPLETED} of {TOTAL})</label>
        {
          dataTask.subTask &&
            dataTask.subTask.map((value) => <Subtask key={value._id} id={value._id} content={value} check={value.completed} />)
        }
        <div className='grid gap-2'>
          <label htmlFor='status' className='text-sm font-bold text-kgrayli mt-4'>Current Status</label>
          <select name='status' className='form-select w-full h-[40px] border-solid border-kgrayli border-[1px] rounded-md border-opacity-25'>
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
          <div className='h-24 w-40 bg-kwhite shadow-lg absolute -right-8 top-16 rounded-md z-30 md:top-16 md:w-48 lg:top-20'>
            <BoardConfig />
          </div>
        )
      }
    </article>
  )
}
