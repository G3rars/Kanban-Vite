import React, { useState } from 'react'
import SubTaskCard from './subTaskCard'
import Button from './button'
import { postBoard } from '../../core/api'

export default function NewBoardModal ({ event }) {
  const [nameBoard, setNameBoard] = useState('')
  const [componentList, setComponentList] = useState([])
  const [columnName, setColumName] = useState('')

  const columnState = (value) => {
    setColumName(value)
  }

  const handleAddColumn = () => {
    const newComponent = <SubTaskCard handleRemoveColumn={handleRemoveColumn} columnState={columnState} />
    setComponentList(prevList => [...prevList, newComponent])
  }

  const handleRemoveColumn = (index) => {
    setComponentList(prevList => {
      const newList = [...prevList]
      newList.splice(index, 1)
      return newList
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(columnName)

    const formData = {
      name: nameBoard
    }
    postBoard(formData)
  }
  return (
    <div className='absolute h-[100svh] w-screen bg-black grid place-content-center bg-opacity-30 z-40'>
      <article className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[415px] p-6 rounded-md flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-kblack'>Add New Board</h3>
          <img onClick={event} className='h-4 w-4 cursor-pointer' src="/styles/assets/icon-cross.svg" alt="icon-cross.svg" />
        </div>
        <form onSubmit={handleSubmit} className='grid gap-2'>
          <label htmlFor='boardName' className='text-sm font-bold text-kgrayli opacity-60'>Board Name</label>
          <input type='text' id='boardName' name='boardName' placeholder='e.g. Web Design' className='w-full h-10 border-solid border-kgrayli border-[1px] rounded border-opacity-25 pl-4 py-2 outline-kpurple' onChange={(e) => setNameBoard(e.target.value)} />
          <div className='grid gap-2 mt-4 mb-1'>
            <p className='text-sm font-bold text-kgrayli opacity-60'>Board Columns</p>
            <div className='grid gap-2 overflow-y-auto h-28 scrollbar-thin scrollbar-thumb-kpurple pr-4'>
            {
             componentList.length === 0
               ? (<p className='opacity-60 text-center pt-10 capitalize'>No column created</p>)
               : (componentList.map((component, index) => (
             <div key={index}>{component}</div>)))}
            </div>
          </div>
          <Button event={handleAddColumn} key='newColBtn' style='secondary' size='mb-4'><p>+ Add New Column</p></Button>
          <Button event={handleSubmit} key='newBoardBtn' style='primarysm'><p>Create New Board</p></Button>
        </form>
      </article>
    </div>
  )
}
