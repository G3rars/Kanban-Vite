import React, { useState, useRef, useEffect } from 'react'
import Button from '../button'
import SubTaskCard from '../subTaskCard'
import { v4 as uuidv4 } from 'uuid'
import { postBoard, postColumn } from '../../../core/api'
import { getFormData, objectToArr } from '../../helpers/utilities'
import { IconCross } from '../icons/Symbols'
import { Alert } from '../../helpers/alerts'
import { ToastContainer } from 'react-toastify'

export default function NewBoardModal ({ close, setInitialBoard, initialBoard }) {
  const [column, setColumn] = useState([])
  const formRef = useRef()

  useEffect(() => {
    if (column.length === 0) {
      const cols = []
      cols.push({
        name: 'col_0',
        required: true,
        id: uuidv4()
      })
      setColumn(cols)
    }
  }, [column])

  function saveColInfo () {
    const formData = getFormData(formRef.current)
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
    const formData = getFormData(formRef.current)
    try {
      const postData = await postBoard({ name: formData.name })
      const id = postData._id
      const cols = saveColInfo()
      const columnPromises = await Promise.allSettled(cols.map(async (col) => await postColumn({ name: col.value }, id))) // TODO: FIX THIS
      const formatData = { board_name: postData.name, board_id: postData._id, board_columns: columnPromises }
      const updateState = [...initialBoard, formatData]
      setInitialBoard(updateState)

      // Alert(() => Promise.resolve(), 'The board has been created successfully')
      close()
    } catch (error) {
      console.log(error)
      Alert(() => Promise.reject(error), 'Error')
    }
  }

  return (
    <article onClick={e => e.stopPropagation()} className='flex min-h-[415px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack dark:text-kwhite'>Add New Board</h3>
        <button onClick={close} className='h-4 w-4'><IconCross /></button>
      </div>
      <form className='grid gap-2' onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli/60'>Board Name</label>
        <input
          required
          minLength={4}
          type='text'
          id='boardName'
          name='name'
          placeholder='e.g. Web Design'
          className='h-10 w-full rounded border-[1px] border-solid border-kgrayli/30 py-2 pl-4 outline-kpurple dark:bg-transparent dark:text-kwhite'
        />
        <div className='mb-1 mt-4 grid gap-2'>
          <p className='text-sm font-bold text-kgrayli/60'>Board Columns</p>
          <div className='grid h-28 gap-2 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-kpurple'>
            {
              column.length === 0
                ? (<p className='p-8 text-center opacity-60'>Empty Columns</p>)
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
      <ToastContainer/>
    </article>
  )
}
