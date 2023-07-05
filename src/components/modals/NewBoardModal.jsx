import React, { useState, useRef, useEffect } from 'react'
import Button from '../button'
import SubTaskCard from '../subTaskCard'
import { v4 as uuidv4 } from 'uuid'
import { postBoard, postColumn } from '../../../core/api'
import { getFormData, objectToArr } from '../../helpers/utilities'

export default function NewBoardModal ({ event }) {
  const [column, setColumn] = useState([])
  const newBoardForm = useRef()

  useEffect(() => {
    if (column.length === 0) {
      const cols = []
      cols.push({
        name: 'col_1',
        required: true,
        id: uuidv4()
      })
      setColumn(cols)
    }
  }, [column])

  function saveColInfo () {
    const formData = getFormData(newBoardForm.current)
    const dataArr = objectToArr(formData)
    dataArr.length !== 0 && dataArr.shift()
    const cols = dataArr.map((item, index) => ({
      name: item[0],
      value: item[1],
      id: column[index].id
    }))
    return cols
  }

  const handleAddColumn = () => {
    const cols = saveColInfo()
    cols.push({
      name: `col_${cols.length + 1}`,
      id: uuidv4()
    })
    setColumn(cols)
  }

  const handleDeleteColumn = (columnID) => {
    const cols = saveColInfo()
    const index = cols.findIndex((item) => item.id === columnID)
    cols.splice(index, 1)
    setColumn([...cols])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = getFormData(newBoardForm.current)
    try {
      const postData = await postBoard({ name: formData.name })
      const id = postData._id
      const cols = saveColInfo()
      cols.forEach(async (col) => await postColumn({ name: col.name }, id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article onClick={e => e.stopPropagation()} className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[415px] p-6 rounded-md flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack'>Add New Board</h3>
        <img onClick={event} className='h-4 w-4 cursor-pointer' src="/styles/assets/icon-cross.svg" alt="icon-cross.svg" />
      </div>
      <form className='grid gap-2' onSubmit={handleSubmit} ref={newBoardForm}>
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli opacity-60'>Board Name</label>
        <input required type='text' id='boardName' name='name' placeholder='e.g. Web Design' className='w-full h-10 border-solid border-kgrayli border-[1px] rounded border-opacity-25 pl-4 py-2 outline-kpurple' />
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
                      required={item.required}
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
