import React, { useState, useRef, useEffect } from 'react'
import { Button } from '../components/button'
import { SubTaskCard } from '../components/subTaskCard'
import { v4 as uuidv4 } from 'uuid'
import { postBoard, postColumn } from '../../core/api'
import { getFormData, objectToArr } from '../helpers/utilities'
import { IconCross } from '../icons/Symbols'
import { Alert } from '../helpers/alerts'
import { toast } from 'react-toastify'
import { useDisable } from '../customHooks/useDisable'

function NewBoardModal ({ close, updateBoards }) {
  const [column, setColumn] = useState([])
  const formRef = useRef()
  const { isDisabled, preventMulticlick, resetMultiClick } = useDisable()

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
    if (isDisabled()) return
    preventMulticlick()
    const formData = getFormData(formRef.current)
    const loadingId = toast.loading('Please wait...', { autoClose: false })
    try {
      const { _id: boardID, name: boardName } = await postBoard({ name: formData.name })
      const cols = saveColInfo()
      const columnPromises = cols.map(async (col) => await postColumn({ name: col.value }, boardID))
      const updatedColumns = await Promise.all(columnPromises)
      const newBoard = { name: boardName, _id: boardID, columns: updatedColumns }
      updateBoards(newBoard)
      Alert(() => Promise.resolve(), loadingId, 'The board has been created successfully')
      close()
    } catch (error) {
      Alert()
      console.log(error)
      Alert(() => Promise.reject(error), loadingId)
    } finally {
      resetMultiClick()
    }
  }
  return (
    <article className='flex min-h-[415px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
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
          maxLength='30'
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
                      max={'15'}
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

export { NewBoardModal }
