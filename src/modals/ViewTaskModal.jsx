import React, { useRef, useState } from 'react'
import { Subtask } from '../components/SubTask'
import { BoardConfig } from './BoardConfig'
import { putCard } from '../../core/api'
import { IconThreeDots } from '../icons/Symbols'
import { Alert } from '../helpers/alerts'
import { toast } from 'react-toastify'
import { Button } from '../components/button'
import { getFormData } from '../helpers/utilities'
import { useDisable } from '../customHooks/useDisable'

function ViewTaskModal ({ dataTask, activeBoard, openDeleteTask, close, editTask, replaceBoardCard }) {
  const [modal, setModal] = useState(false)
  const [task, setTask] = useState(dataTask.subTask)
  const formRef = useRef()
  const { isDisabled, preventMulticlick, resetMultiClick } = useDisable()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loadingId = toast.loading('Please wait...', { autoClose: false })
    if (isDisabled()) return
    preventMulticlick()
    const subTasks = task.map(value => ({ name: value.name, completed: value.completed }))
    const { status: columnID } = getFormData(formRef.current)
    const newCardInfo = {
      title: dataTask.title,
      description: dataTask.description,
      subTask: subTasks
    }
    if (columnID === dataTask.column) newCardInfo.column = dataTask.column
    else {
      newCardInfo.column = columnID
      newCardInfo._id = dataTask._id
    }

    try {
      const newCard = await putCard(dataTask._id, newCardInfo)
      replaceBoardCard({ newTask: newCard, oldCard: { ...newCardInfo, column: dataTask.column } })
      // TODO: hacer que funcione en vivo
      Alert(() => Promise.resolve(), loadingId, 'The task has been update successfully')
      close()
    } catch (error) {
      console.log(error)
      Alert(() => Promise.reject(error), loadingId)
    } finally {
      resetMultiClick()
    }
  }
  const TOTAL = task.length
  const COMPLETED = task.filter(item => item.completed).length

  return (
    <article className='relative flex min-h-[560px] w-screen max-w-[345px] flex-col justify-between gap-6 rounded-md bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
      <div className='flex max-h-fit items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack dark:text-kwhite'>{dataTask.title}</h3>
        <button onClick={taskOptions} className='flex h-10 w-5 items-center justify-end'><IconThreeDots /></button>
      </div>
      <div className='max-h-48 min-h-[50px] overflow-y-auto scrollbar-thin scrollbar-thumb-kcian'>
        <p className='h-full text-sm font-normal leading-6 text-kgrayli'>{dataTask.description}</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className='flex h-full flex-col justify-between gap-2'>
        <div className='grid gap-2'>
        <p className='mb-2 text-sm font-bold text-kgrayli'>Subtasks ({COMPLETED} of {TOTAL})</p>
        {
          dataTask.subTask && dataTask.subTask.map((value) =>
            <Subtask
              handleCheckbox={handleCheckbox}
                key={value._id}
                id={value._id}
                content={value}
                check={value.completed}
            />)
        }
        </div>
        <div className='grid gap-2'>
          <label htmlFor='status' className='mt-4 text-sm font-bold text-kgrayli'>Current Status</label>
          <select name='status' className='form-select h-[40px] w-full rounded-md border-[1px] border-solid border-kgrayli/30 text-kblackli dark:bg-kblackli dark:text-kwhite'>
            {activeBoard &&
                activeBoard.columns.map((value) =>
                  value._id === dataTask.column ? (<option className='text-kblackli dark:text-kwhite' key={value._id} value={value._id}>{value.name}</option>) : null)
            }
            {activeBoard &&
                activeBoard.columns.map((value) =>
                  value._id !== dataTask.column ? (<option className='text-kblackli dark:text-kwhite' key={value._id} value={value._id}>{value.name}</option>) : null)
            }
          </select>
        </div>
        <div>
          <div className='grid gap-3'>
            <Button event={close} key='closeModalBtn' style='secondary'><p>Close</p></Button>
            <Button btnType='submit' style='primarysm'>Save Changes</Button>
          </div>
        </div>
      </form>
      {
        modal && (
          <div className='absolute -right-8 top-16 z-30 h-24 w-40 rounded-md shadow-lg md:top-16 md:w-48 lg:top-20'>
            <BoardConfig content={{ top: 'Edit Task', down: 'Delete Task' }} edit={editTask} remove={openDeleteTask}/>
          </div>
        )
      }
    </article>
  )
}

export { ViewTaskModal }
