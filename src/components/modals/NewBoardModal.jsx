import React, { useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { postBoard, postColumn } from '../../../core/api'
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
      console.log(`se ha creado el board aqui tienes la id ${postData._id}`)
      await subTaskValues.map((value) => {
        const newColumn = {
          name: value
        }
        console.log(`la columna ${value} ha sido creada`)
        return postColumn(newColumn, id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='absolute h-[100svh] w-screen bg-black grid place-content-center bg-opacity-30 z-40'>
      <article className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[415px] p-6 rounded-md flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-kblack'>Add New Board</h3>
          <img onClick={event} className='h-4 w-4 cursor-pointer' src="/styles/assets/icon-cross.svg" alt="icon-cross.svg" />
        </div>
        <form className='grid gap-2'>
          <label htmlFor='boardName' className='text-sm font-bold text-kgrayli opacity-60'>Board Name</label>
          <input type='text' id='boardName' name='boardName' placeholder='e.g. Web Design' className='w-full h-10 border-solid border-kgrayli border-[1px] rounded border-opacity-25 pl-4 py-2 outline-kpurple' onChange={(e) => setNameBoard(e.target.value)} />
          <div className='grid gap-2 mt-4 mb-1'>
            <p className='text-sm font-bold text-kgrayli opacity-60'>Board Columns</p>
            <div className='grid gap-2 overflow-y-auto h-28 scrollbar-thin scrollbar-thumb-kpurple pr-4'>
              {
              column.length === 0 ? (<p className='opacity-60 text-center p-8'>Empty Columns</p>) : column
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
