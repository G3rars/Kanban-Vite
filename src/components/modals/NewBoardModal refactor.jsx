import React, { useState, useRef } from 'react'
import Button from '../button'
import SubTaskCard from '../subTaskCard'
import { v4 as uuidv4 } from 'uuid'
// import { useTest } from '../customHooks/useTest'
// import { postBoard, postColumn } from '../../../core/api'

export default function NewBoardModal ({ event }) {
  const [column, setColumn] = useState([])
  const newBoardForm = useRef()
  // const { saludo, setSaludo } = useTest()

  const handleAddColumn = () => {
    const formData = Object.fromEntries(new FormData(newBoardForm.current))
    const test = Object.entries(formData)
    test.shift()
    const cols = test.map((item) => ({
      name: item[0],
      value: item[1],
      id: uuidv4()
    }))
    cols.push({
      name: `col_${cols.length + 1}`,
      value: '',
      id: uuidv4()
    })
    setColumn(cols)
  }

  const handleDeleteColumn = (colID) => {
    const newCols = [...column]
    const formData = Object.fromEntries(new FormData(newBoardForm.current))
    const test = Object.entries(formData)
    test.shift()
    const cols = test.map((item, index) => ({
      name: item[0],
      value: item[1],
      id: newCols.id[index]
    }))
    const index = cols.findIndex((item) => item.id === colID)
    cols.splice(index, 1)
    setColumn([...cols])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    try {
      console.log('test', formData)
      // const postData = await postBoard(formData.name)
      // const id = postData._id
      // subTaskValues.map((value) => {
      //   const newColumn = {
      //     name: value
      //   }
      //   console.log(`la columna ${value} ha sido creada`)
      //   return postColumn(newColumn, id)
      // })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[415px] p-6 rounded-md flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack'>Add New Board</h3>
        <img onClick={event} className='h-4 w-4 cursor-pointer' src="/styles/assets/icon-cross.svg" alt="icon-cross.svg" />
      </div>
      <form className='grid gap-2' onSubmit={handleSubmit} ref={newBoardForm}>
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli opacity-60'>Board Name</label>
        <input type='text' id='boardName' name='name' placeholder='e.g. Web Design' className='w-full h-10 border-solid border-kgrayli border-[1px] rounded border-opacity-25 pl-4 py-2 outline-kpurple' />
        <div className='grid gap-2 mt-4 mb-1'>
          <p className='text-sm font-bold text-kgrayli opacity-60'>Board Columns</p>
          <div className='grid gap-2 overflow-y-auto h-28 scrollbar-thin scrollbar-thumb-kpurple pr-4'>
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
        </div>
        <Button event={handleAddColumn} key='newColBtn' style='secondary' size='mb-4'><p>+ Add New Column</p></Button>
        <Button btnType='submit' key='newBoardBtn' style='primarysm'><p>Create New Board</p></Button>
      </form>
    </article>
  )
}
