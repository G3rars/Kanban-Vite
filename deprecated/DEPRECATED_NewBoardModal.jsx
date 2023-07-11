import React, { useState } from 'react'
import SubTaskCard from '../src/components/subTaskCard'
import Button from '../src/components/button'
import { postBoard, postColumn } from '../core/api'
import { v4 as uuidv4 } from 'uuid'

export default function NewBoardModal ({ event }) {
  const [nameBoard, setNameBoard] = useState('')
  const [column, setColumn] = useState([])
  const [subTaskValues, setSubTaskValues] = useState([])

  const handleUpdateSubTask = (index, value) => {
    setSubTaskValues((prevValues) => {
      const updatedValues = [...prevValues]
      updatedValues[index] = value
      return updatedValues
    })
  }

  const handleAddColumn = (e) => {
    e.preventDefault()
    setColumn([...column, <SubTaskCard handleDeleteColumn={handleDeleteColumn} onUpdate={(value) => handleUpdateSubTask(column.length, value)} key={uuidv4()} dataKey={uuidv4()} />])
  }

  const handleDeleteColumn = (e, dataKey) => {
    e.preventDefault()
    setColumn(prevColumn => {
      const updatedColumn = prevColumn.filter(subTask => subTask.props.dataKey !== dataKey)
      return updatedColumn
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: nameBoard
    }

    try {
      const postData = await postBoard(formData)
      const id = postData._id
      subTaskValues.map((value) => {
        const newColumn = {
          name: value
        }
        return postColumn(newColumn, id)
      })
      alert('Se ha creado el tablero')
      location.reload()
    } catch (error) {
    }
  }

  return (
    <div className='absolute z-40 grid h-[100svh] w-screen place-content-center bg-black bg-opacity-30'>
      <article className='flex min-h-[415px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 md:max-w-[480px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-kblack'>Add New Board</h3>
          <img onClick={event} className='h-4 w-4 cursor-pointer' src="/styles/assets/icon-cross.svg" alt="icon-cross.svg" />
        </div>
        <form className='grid gap-2'>
          <label htmlFor='boardName' className='text-sm font-bold text-kgrayli opacity-60'>Board Name</label>
          <input type='text' id='boardName' name='boardName' placeholder='e.g. Web Design' className='h-10 w-full rounded border-[1px] border-solid border-kgrayli border-opacity-25 py-2 pl-4 outline-kpurple' onChange={(e) => setNameBoard(e.target.value)} />
          <div className='mb-1 mt-4 grid gap-2'>
            <p className='text-sm font-bold text-kgrayli opacity-60'>Board Columns</p>
            <div className='grid h-28 gap-2 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-kpurple'>
              {
              column.length === 0 ? (<p className='p-8 text-center opacity-60'>Empty Columns</p>) : column
              }
            </div>
          </div>
          <Button event={handleAddColumn} key='newColBtn' style='secondary' size='mb-4'><p>+ Add New Column</p></Button>
          <Button event={handleSubmit} key='newBoardBtn' style='primarysm'><p>Create New Board</p></Button>
        </form>
      </article>
    </div>
  )
}
