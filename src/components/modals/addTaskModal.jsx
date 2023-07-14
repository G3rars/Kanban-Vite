import React, { useRef, useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { postCard, putCard } from '../../../core/api'
import { v4 as uuidv4 } from 'uuid'
import 'react-toastify/dist/ReactToastify.css'
import { IconCross } from '../icons/Symbols'
import { getFormData, objectToArr } from '../../helpers/utilities'
import { useDisable } from '../../customHooks/useDisable'
import { Alert } from '../../helpers/alerts'
import { toast } from 'react-toastify'

export default function AddTaskModal ({ activeBoard, dataTask, isEdit, close, replaceBoardCard, addCardToColumn }) {
  const initialCols = isEdit ? dataTask.subTask : [{ _id: uuidv4(), value: '' }]
  const [column, setColumn] = useState(initialCols)
  const newTaskForm = useRef()
  const { isDisabled, preventMulticlick, resetMultiClick } = useDisable()

  const handleAddColumn = () => {
    const cols = [...column]
    cols.push({
      _id: uuidv4(),
      value: ''
    })
    setColumn(cols)
  }

  const handleDeleteColumn = (colID) => {
    const newCols = column.filter((item) => item._id !== colID)
    setColumn(newCols)
  }

  const submitEditTask = async (e) => {
    e.preventDefault()
    const loadingId = toast.loading('Please wait...', { autoClose: false })
    if (isDisabled()) return
    preventMulticlick()

    const { status: column, description, title, ...cols } = getFormData(newTaskForm.current)
    const subTasks = objectToArr(cols)
    const mappedSubtasks = subTasks.map(([_, value]) => ({ name: value, completed: false }))

    const updatedCard = {
      title,
      description,
      column,
      subTask: mappedSubtasks
    }
    if (column !== dataTask.column) updatedCard._id = dataTask._id
    try {
      const newTask = await putCard(dataTask._id, updatedCard)
      console.log(newTask)
      replaceBoardCard({ newTask, oldCard: { updatedCard, column: dataTask.column } })
      Alert(() => Promise.resolve(), loadingId, 'The task has been update')
      close()
    } catch (error) {
      Alert(() => Promise.reject(error), loadingId)
    } finally {
      resetMultiClick()
    }
  }

  const submitNewTask = async (e) => {
    e.preventDefault()
    const loadingId = toast.loading('Please wait...', { autoClose: false })
    if (isDisabled()) return
    preventMulticlick()

    const { status: column, description, title, ...cols } = getFormData(newTaskForm.current)
    const subTasks = objectToArr(cols)
    const mappedSubtasks = subTasks.map(([_, value]) => ({ name: value, completed: false }))
    const cardData = {
      title,
      description,
      column,
      subTask: mappedSubtasks
    }

    try {
      const newTask = await postCard(cardData, column)
      addCardToColumn({ newTask })
      Alert(() => Promise.resolve(), loadingId, 'The task has been created')
      close()
    } catch (error) {
      Alert(() => Promise.reject(error), loadingId)
    } finally {
      resetMultiClick()
    }
  }

  return (
    <>
      <section className='min-h-fit w-screen max-w-[350px] rounded-lg bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold dark:text-kwhite'>{!isEdit ? 'Add New Task' : 'Edit Task'}</h3>
          <button onClick={close} className='h-4 w-4'><IconCross /></button>
      </div>
        <form onSubmit={(e) => isEdit ? submitEditTask(e) : submitNewTask(e)} ref={newTaskForm} className='grid w-full'>
          <label htmlFor='title' className='pb-1 pt-3 text-xs font-bold opacity-60 dark:text-kwhite'>Title</label>
          <input
            className='h-[40px] w-full rounded-md border-[1px] border-solid border-kgrayli/30 pl-4 text-md font-medium leading-6 outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite'
            type='text'
            name='title'
            required
            maxLength="46"
            defaultValue={isEdit ? dataTask.title : ''}
            placeholder='e.g. Take coffee break'
          />
          <label htmlFor='description' className='pb-1 pt-5 text-xs font-bold opacity-60 dark:text-kwhite'>Description</label>
          <textarea
            name='description'
            rows='5'
            defaultValue={isEdit ? dataTask.description : ''}
            className='w-full rounded-md border-[1px] border-solid border-kgrayli/30 text-sm font-medium outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite md:h-20'
            placeholder='e.g. It’s always good to take a break. This
                    15 minute break will  recharge the batteries
                    a little.'
          />
          <label htmlFor='subtask' className='pb-1 pt-5 text-xs font-bold opacity-60 dark:text-kwhite'>SubTask</label>
          <div className='h-[120px] overflow-y-auto text-md font-medium scrollbar-thin scrollbar-thumb-kpurple'>
          { (column.length === 0) && <p className='pt-7 text-center opacity-60 dark:text-kwhite'>Add new subtaks</p> }
          {
            column.map(item =>
              <SubTaskCard
                  max={'50'}
                  key={item._id}
                  colID={item._id}
                  handleDeleteColumn={handleDeleteColumn}
                  inputName={item._id}
                  defValue={item.name}/>)
          }
          </div>
          <Button
            style='secondary'
            event={handleAddColumn}
            key='newColBtn'
            size='mt-3'
          >
            +add new subtask
          </Button>
          <label htmlFor='status' className='pb-1 pt-3 text-xs font-bold opacity-60 dark:text-kwhite'>Status</label>
          <select name='status' className='h-[40px] w-full rounded-md border-[1px] border-solid border-kgrayli/30 text-sm font-medium outline-kpurple invalid:border-kred dark:bg-kblackli dark:text-kwhite'>
            {
              !isEdit && activeBoard && activeBoard.columns.map(value => (<option key={value._id} value={value._id}>{value.name}</option>))
            }
            {isEdit && activeBoard &&
                activeBoard.columns.map((value) =>
                  value._id === dataTask.column ? (<option key={value._id} value={value._id}>{value.name}</option>) : null)
            }
            {isEdit && activeBoard &&
                activeBoard.columns.map((value) =>
                  value._id !== dataTask.column ? (<option key={value._id} value={value._id}>{value.name}</option>) : null)
            }
          </select>
          <Button
            style='primarysm'
            btnType='submit'
            size='mt-3'
          >
            { isEdit ? 'Save Changes' : 'Create Task' }
          </Button>
        </form>
      </section>
    </>
  )
}
