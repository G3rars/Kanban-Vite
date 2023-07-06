import React, { useRef, useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { postCard } from '../../../core/api'
import { v4 as uuidv4 } from 'uuid'

export default function AddTaskModal ({ activeBoard }) {
  const [column, setColumn] = useState([])
  const newTaskForm = useRef()

  const handleAddColumn = () => {
    const formData = Object.fromEntries(new FormData(newTaskForm.current))
    const dataArr = Object.entries(formData)
    const cols = dataArr.filter(([name]) => name.startsWith('col_')).map(([name, value]) => ({ name, value, id: uuidv4() }))
    cols.push({
      name: `col_${cols.length + 1}`,
      value: '',
      id: uuidv4()
    })
    setColumn(cols)
    console.log(cols)
  }
  const handleDeleteColumn = (columnID) => {
    const newCols = [...column]
    const index = newCols.findIndex((item) => item.id === columnID)
    const formData = Object.fromEntries(new FormData(newTaskForm.current))
    const dataArr = Object.entries(formData)
    const cols = dataArr.filter(([name]) => name.startsWith('col_')).map(([name, value]) => ({ name, value, id: newCols[index].id }))
    cols.splice(index, 1)
    setColumn([...cols])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    const dataArr = Object.entries(formData)
    const cols = dataArr.filter(([name]) => name.startsWith('col_')).map(([_, value]) => ({ name: value, complete: false }))
    const data = {
      title: formData.title,
      description: formData.description,
      subTask: cols
    }
    postCard(data, formData.id)
  }
  return (
    <>
      <section onClick={e => e.stopPropagation()} className='w-screen max-w-[350px] min-h-fit rounded-lg bg-kwhite p-6 md:max-w-[480px]'>
        <h3 className='font-bold text-lg'>Add New Task</h3>
        <form onSubmit={handleSubmit} ref={newTaskForm} className='grid w-full'>
          <label htmlFor='title' className='opacity-60 font-bold text-xs pt-3 pb-1'>Title</label>
          <input
            className='w-full h-[40px] border-[1px] rounded-md text-md font-medium leading-6 pl-4 border-solid border-kgrayli border-opacity-30'
            type='text'
            name='title'
            placeholder='e.g. Take coffee break'
          />
          <label htmlFor='description' className='opacity-60 font-bold text-xs pt-5 pb-1'>Description</label>
          <textarea
          name='description'
            className='w-full h-[112px] border-[1px] rounded-md border-solid border-kgrayli border-opacity-30 text-sm font-medium'
            placeholder='e.g. It’s always good to take a break. This
                    15 minute break will  recharge the batteries
                    a little.'
          />
          <label htmlFor='subtask' className='opacity-60 font-bold text-xs pt-5 pb-1'>SubTask</label>
          <div className='text-md h-[120px] font-medium overflow-y-auto scrollbar-thin scrollbar-thumb-kpurple'>
          {
              column.length === 0
                ? (<p className='opacity-60 text-center p-8'>Empty Columns</p>)
                : (column.map((item) => (
                    <SubTaskCard
                      key={uuidv4()}
                      colID={item.id}
                      handleDeleteColumn={handleDeleteColumn}
                      inputName={item.name}
                      defValue={item.value}
                    />))
                  )
            }
          </div>
          <Button
            size={''}
            style='secondary'
            event={handleAddColumn}
            key='newColBtn'
          >
            +add new task
          </Button>
          <label htmlFor='status' className='opacity-60 font-bold text-xs pt-3 pb-1'>Status</label>
          <select name='id' className='w-full h-[40px] border-[1px] rounded-md border-solid border-kgrayli border-opacity-30 text-sm font-medium'>
            {
              activeBoard && activeBoard.board_columns.map(value => (<option key={value._id} value={value._id}>{value.name}</option>))
            }
          </select>
          <Button
            style='primarysm'
            size={'mt-6'}
            btnType='submit'
          >
            Create Task
          </Button>
        </form>
      </section>
    </>
  )
}
