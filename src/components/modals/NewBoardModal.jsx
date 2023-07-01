import React, { useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { getBoards, postBoard, postColumn } from '../../../core/api'

export default function NewBoardModal ({ event }) {
  const [nameBoard, setNameBoard] = useState('')
  const [column, setColumn] = useState([])
  const [subTaskValues, setSubTaskValues] = useState([])
  const [data, setData] = useState(null)

  const handleUpdateSubTask = (index, value) => {
    setSubTaskValues((prevValues) => {
      const updatedValues = [...prevValues]
      updatedValues[index] = value
      return updatedValues
    })
  }

  const handleAddColumn = (e) => {
    e.preventDefault()
    setColumn([...column, <SubTaskCard onUpdate={(value) => handleUpdateSubTask(column.length, value)} key={column.length} />])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: nameBoard
    }

    try {
      await postBoard(formData)
      const response = await getBoards()
      const foundBoard = response.find((board) => board.name === nameBoard)

      setData(response)
      console.log(response)

      if (foundBoard) {
        console.log(foundBoard._id)
        for (const value of subTaskValues) {
          await postColumn({
            name: value
          }, foundBoard._id)
        }
      } else {
        console.log('No se encontró un board con el nombre:', nameBoard)
      }
    } catch (error) {
      console.error(error)
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
              {column}
            </div>
          </div>
          <Button event={handleAddColumn} key='newColBtn' style='secondary' size='mb-4'><p>+ Add New Column</p></Button>
          <Button event={handleSubmit} key='newBoardBtn' style='primarysm'><p>Create New Board</p></Button>
        </form>
      </article>
    </div>
  )
}
