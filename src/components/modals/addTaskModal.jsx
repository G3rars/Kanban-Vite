import React, { useRef, useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { postCard, putCard } from '../../../core/api'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconCross } from '../icons/Symbols'
import { getFormData, objectToArr } from '../../helpers/utilities'

export default function AddTaskModal ({ activeBoard, dataTask, isEdit, close, replaceBoardCard, addCardToColumn }) {
  const [column, setColumn] = useState([])
  const [apiSubtask, setApiSubtask] = useState(dataTask ? dataTask.subTask : null)
  const newTaskForm = useRef()

  const handleAddColumn = () => {
    const cols = [...column]
    cols.push({
      _id: `col_${uuidv4()}`,
      value: ''
    })
    setColumn(cols)
  }

  const handleDeleteColumn = (colID) => {
    console.log(colID)
    if (colID.startsWith('col_')) {
      const newCols = column.filter((item) => item._id !== colID)
      setColumn(newCols)
    } else {
      const newCols = apiSubtask.filter((item) => item._id !== colID)
      setApiSubtask(newCols)
    }
  }

  const submitEditTask = async (e) => {
    e.preventDefault()
    const { status: column, description, title, ...cols } = getFormData(newTaskForm.current)
    const subTasks = objectToArr(cols)
    const mappedSubtasks = subTasks.map(([_, value]) => ({ name: value, completed: false }))

    const updatedCard = {
      title,
      description,
      column,
      _id: dataTask._id,
      subTask: mappedSubtasks
    }
    const newTask = await putCard(dataTask._id, updatedCard)
    replaceBoardCard({ newTask, oldCard: updatedCard })
    close()
  }

  const submitNewTask = async (e) => {
    e.preventDefault()
    const { status: column, description, title, ...cols } = getFormData(newTaskForm.current)
    const subTasks = objectToArr(cols)
    const mappedSubtasks = subTasks.map(([_, value]) => ({ name: value, complete: false }))
    const cardData = {
      title,
      description,
      column,
      subTask: mappedSubtasks
    }
    const newTask = await postCard(cardData, column)
    addCardToColumn({ newTask })
    close()
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
          {
            !isEdit && column.length === 0
              ? <p className='pt-7 text-center opacity-60 dark:text-kwhite'>Add new columns</p>
              : (isEdit && dataTask && dataTask.subTask.length === 0 &&
                  <p className='pt-7 text-center opacity-60'>Add new columns</p>
                )
          }
          {isEdit
            ? apiSubtask.map(item =>
                  <SubTaskCard max={'50'} key={item._id} colID={item._id} handleDeleteColumn={handleDeleteColumn}
                      inputName={item._id}
                      defValue={item.name}/>)
            : column.map(item =>
                  <SubTaskCard max={'50'} key={item._id}
                      colID={item._id}
                      handleDeleteColumn={handleDeleteColumn}
                      inputName={item._id}
                      defValue={item.value}/>)
          }
          {isEdit && column.map(item =>
                  <SubTaskCard max={'50'} key={item._id}
                      colID={item._id}
                      handleDeleteColumn={handleDeleteColumn}
                      inputName={item._id}
                      defValue={item.value}
                      />)
          }
          </div>
          <Button
            style='secondary'
            event={handleAddColumn}
            key='newColBtn'
            size='mt-3'
          >
            +add new task
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
      <ToastContainer />
    </>
  )
}
