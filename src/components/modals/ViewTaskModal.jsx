import React, { useRef, useState } from 'react'
import { Subtask } from '../SubTask'
import { BoardConfig } from './BoardConfig'
import { deleteCard, getCard, postCard, putCard } from '../../../core/api'
import { IconThreeDots } from '../icons/Symbols'
import { Alert } from '../../helpers/alerts'
import { ToastContainer } from 'react-toastify'
import Button from '../button'

export default function ViewTaskModal ({ dataTask, activeBoard, handleEditTask, openDeleteTask, close }) {
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
      await deleteCard(updateData._id)
      postCard(data, formData.status)
    }
  }

  const handleSubmit = async () => {
    const subTasks = task.map(value => ({ name: value.name, completed: value.completed }))
    const sendData = {
      subTask: subTasks
    }
    try {
      const putCardPromise = putCard(dataTask._id, sendData)
      await changeColumn()
      await Promise.all([putCardPromise])
      Alert(() => Promise.resolve(), 'Changes have been saved')
    } catch (error) {
      Alert(() => Promise.reject(error))
    }
  }
  const TOTAL = dataTask.subTask.length
  const COMPLETED = dataTask.subTask.filter(item => item.completed).length

  return (
    <article
      onClick={e => e.stopPropagation()}
      className='relative flex min-h-[560px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'
    >
      <div className='flex max-h-fit items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack dark:text-kwhite'>{dataTask.title}</h3>
        <button className='flex h-10 w-5 items-center justify-end' onClick={taskOptions}><IconThreeDots /></button>
      </div>
      <div className='min-h-[40px]'>
        <p className='text-sm font-normal leading-6 text-kgrayli'>{dataTask.description}</p>
      </div>

      <form ref={formRef} className='flex h-full flex-col justify-between gap-2'>
        <div className='grid gap-2'>
        <label className='mb-2 text-sm font-bold text-kgrayli'>Subtasks ({COMPLETED} of {TOTAL})</label>
        {
          dataTask.subTask &&
            dataTask.subTask.map((value) => <Subtask handleCheckbox={handleCheckbox} key={value._id} id={value._id} content={value} check={value.completed} />)
        }
        </div>
        <div className='grid gap-2'>
          <label htmlFor='status' className='mt-4 text-sm font-bold text-kgrayli'>Current Status</label>
          <select name='status' className='form-select h-[40px] w-full rounded-md border-[1px] border-solid border-kgrayli/30 text-kwhite dark:bg-kblackli'>
            {activeBoard &&
                activeBoard.board_columns.map((value) =>
                  value._id === dataTask.column ? (<option key={value._id} value={value._id}>{value.name}</option>) : null)
            }
            {activeBoard &&
                activeBoard.board_columns.map((value) =>
                  value._id !== dataTask.column ? (<option key={value._id} value={value._id}>{value.name}</option>) : null)
            }
          </select>
        </div>
        <Button event={(e) => { e.preventDefault(); handleSubmit() }} style='primarysm'><p>Save Changes</p></Button>
      </form>
      {
        modal && (
          <div className='absolute -right-8 top-16 z-30 h-24 w-40 rounded-md shadow-lg md:top-16 md:w-48 lg:top-20'>
            <BoardConfig openDeleteBoard={() => { close(); openDeleteTask() }} openEditBoard={handleEditTask}/>
          </div>
        )
      }
      <ToastContainer/>
    </article>
  )
}
