import React, { useRef, useState } from 'react'
import { Subtask } from '../SubTask'
import { BoardConfig } from './BoardConfig'
import { deleteCard, getCard, postCard, putCard } from '../../../core/api'
// import { patchTask } from '../../../core/api'

export default function ViewTaskModal ({ dataTask, activeBoard }) {
  const [modal, setModal] = useState(false)
  const [task, setTask] = useState(dataTask.subTask)
  const formRef = useRef()
  function taskOptions () {
    setModal(prevState => !prevState)
  }

  const handleCheckbox = (id, status) => {
    const taskCpy = task
    const changeTask = taskCpy.map((value) => {
      if (value._id === id) {
        return {
          ...value,
          completed: status
        }
      }
      return value
    })
    setTask(changeTask)
  }

  const changeColumn = async () => {
    let updateData = await getCard()
    updateData = updateData.find(value => value._id === dataTask._id)
    const formData = Object.fromEntries(new FormData(formRef.current))
    if (formData.status !== updateData.column) {
      const data = {
        title: updateData.title,
        description: updateData.description,
        subTask: updateData.subTask
      }
      postCard(data, formData.status)
      deleteCard(updateData._id)
    }
  }

  const test = async () => {
    const deleteId = task.map(value => ({ name: value.name, completed: value.completed }))
    const sendData = {
      subTask: deleteId
    }
    await putCard(dataTask._id, sendData)
    await changeColumn()
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
      <form ref={formRef} className='flex flex-col gap-2 h-full justify-between'>
        <label className='text-sm font-bold text-kgrayli mb-2'>Subtasks ({COMPLETED} of {TOTAL})</label>
        {
          dataTask.subTask &&
            dataTask.subTask.map((value) => <Subtask handleCheckbox={handleCheckbox} key={value._id} id={value._id} content={value} check={value.completed} />)
        }
        <div className='grid gap-2'>
          <label htmlFor='status' className='text-sm font-bold text-kgrayli mt-4'>Current Status</label>
          <select name='status' className='form-select w-full h-[40px] border-solid border-kgrayli border-[1px] rounded-md border-opacity-25'>
            {
              activeBoard &&
                activeBoard.board_columns.map(value => (<option value={value._id} key={value._id}>{value.name}</option>))
                // TODO: colocar como primera opcion del select la columna a la cual pertenece la tarea
            }
          </select>
        </div>
        <button onClick={(e) => { e.preventDefault(); test() } } className='bg-red-500'>prueba</button>
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
