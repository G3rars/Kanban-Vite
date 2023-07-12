import React, { useRef, useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { postCard, putCard } from '../../../core/api'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { Alert } from '../../helpers/alerts'

export default function AddTaskModal ({ activeBoard, dataTask, isEdit, setActiveBoard, close }) {
  const [column, setColumn] = useState([])
  const [apiSubtask, setApiSubtask] = useState(dataTask ? dataTask.subTask : null)
  const [deleteCol, setDeleteCol] = useState([])
  const newTaskForm = useRef()

  const handleAddColumn = (e) => {
    e.preventDefault()
    const cols = [...column]
    cols.push({
      _id: `col_${uuidv4()}`,
      value: ''
    })
    setColumn(cols)
  }

  const handleDeleteColumn = (colID) => {
    if (colID.startsWith('col_')) {
      const newCols = column.filter((item) => item._id !== colID)
      setColumn(newCols)
    } else {
      const newCols = apiSubtask.filter((item) => item._id !== colID)
      setApiSubtask(newCols)
      const findDelete = column.find(value => value._id === colID && !value.id.startsWith('col_'))
      setDeleteCol([...deleteCol, findDelete])
    }
  }

  const submitEditTask = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(newTaskForm.current))
    const dataArr = Object.entries(formData)
    dataArr.pop()
    let subTaskIn = dataArr.slice(2)
    subTaskIn = subTaskIn.map(([_, value]) => ({ name: value, completed: false }))
    const updateBoard = activeBoard
    const res = await putCard(dataTask._id, { title: formData.title, description: formData.description, subTask: subTaskIn })

    if (dataTask.column === formData.status) {
      const indexCol = updateBoard.columns.findIndex((col) => col._id === formData.status)
      const indexTask = updateBoard.columns[indexCol].cards.findIndex((item) => item._id === res._id)
      updateBoard.columns[indexCol].cards.splice(indexTask, 1, res)
    } else {
      const indexCol = updateBoard.columns.findIndex((col) => col._id === dataTask.column)
      const indexTask = updateBoard.columns[indexCol].cards.findIndex((item) => item._id === dataTask._id)
      updateBoard.columns[indexCol].cards.splice(indexTask, 1)

      const indexNewCol = updateBoard.columns.findIndex((col) => col._id === formData.status)
      updateBoard.columns[indexNewCol].cards.push(res)
    }

    setActiveBoard(updateBoard)
    close()
    // Alert(() => putCard(dataTask._id, { title: formData.title, description: formData.description, subTask: subTaskIn }), 'The task has been updated successfully')
  }

  const submitNewTask = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(newTaskForm.current))
    const dataArr = Object.entries(formData)
    const cols = dataArr.filter(([name]) => name.startsWith('col_')).map(([_, value]) => ({ name: value, complete: false }))
    const data = {
      title: formData.title,
      description: formData.description,
      subTask: cols
    }
    const res = await postCard(data, formData.status)
    const updateBoard = activeBoard
    const index = updateBoard.columns.findIndex((item) => item._id === res.column)
    updateBoard.columns[index].cards.push(res)
    setActiveBoard(updateBoard)
    close()
  }
  return (
    <>
      <section onClick={e => e.stopPropagation()} className='min-h-fit w-screen max-w-[350px] rounded-lg bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
        <h3 className='text-lg font-bold dark:text-kwhite'>{!isEdit ? 'Add New Task' : 'Edit Task'}</h3>
        <form onSubmit={(e) => isEdit ? submitEditTask(e) : submitNewTask(e)} ref={newTaskForm} className='grid w-full'>
          <label htmlFor='title' className='pb-1 pt-3 text-xs font-bold opacity-60 dark:text-kwhite'>Title</label>
          <input
            className='h-[40px] w-full rounded-md border-[1px] border-solid border-kgrayli/30 pl-4 text-md font-medium leading-6 outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite'
            type='text'
            name='title'
            defaultValue={isEdit ? dataTask.title : ''}
            placeholder='e.g. Take coffee break'
          />
          <label htmlFor='description' className='pb-1 pt-5 text-xs font-bold opacity-60 dark:text-kwhite'>Description</label>
          <textarea
          name='description'
            defaultValue={isEdit ? dataTask.description : ''}
            className='h-[112px] w-full rounded-md border-[1px] border-solid border-kgrayli/30 text-sm font-medium outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite'
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
            ? apiSubtask.map(item => <SubTaskCard key={item._id} colID={item._id} handleDeleteColumn={handleDeleteColumn}
                      inputName={item._id}
                      defValue={item.name}/>)
            : column.map(item => <SubTaskCard key={item._id}
                      colID={item._id}
                      handleDeleteColumn={handleDeleteColumn}
                      inputName={item._id}
                      defValue={item.value}/>)
          }
          {isEdit && column.map(item => <SubTaskCard key={item._id}
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
            size={'mt-6'}
            btnType='submit'
          >
            { isEdit ? 'Save Changes' : 'Create Task' }
          </Button>
        </form>
      </section>
      <ToastContainer />
    </>
  )
}
