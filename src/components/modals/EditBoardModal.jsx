import React, { useRef, useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { deleteColumn, postColumn, putBoard, putColumn } from '../../../core/api'
import { v4 as uuidv4 } from 'uuid'
import { Alert } from '../../helpers/alerts'
import { ToastContainer } from 'react-toastify'

function EditBoardModal ({ activeBoard }) {
  const [column, setColumn] = useState(activeBoard.board_columns)
  const [deleteCol, setDeleteCol] = useState([])
  const formRef = useRef()

  const handleAddColumn = (e) => {
    e.preventDefault()
    const cols = [...column]
    cols.push({
      _id: `col_${uuidv4()}`,
      name: ''
    })
    setColumn(cols)
  }
  const handleDeleteColumn = (colID) => {
    const newCols = column.filter(value => value._id !== colID)
    setColumn(newCols)
    const findDelete = column.find(value => value._id === colID && !value._id.startsWith('col_'))
    setDeleteCol([...deleteCol, findDelete])
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(formRef.current))
    const dataArr = Object.entries(formData)
    dataArr.shift()
    deleteCol.map(value => deleteColumn(value._id))
    try {
      await putBoard(activeBoard.board_id, { name: formData.boardName })
      const columnPromises = dataArr.map(([id, value]) => {
        if (id.startsWith('col_')) {
          return postColumn({ name: value }, activeBoard.board_id)
        } else {
          return putColumn(id, { name: value })
        }
      })
      await Promise.all(columnPromises)
      Alert(() => Promise.resolve(), 'The board has been successfully updated')
    } catch (error) {
      console.error(error)
      Alert(() => Promise.reject(error))
    }
  }

  return (
    <article onClick={e => e.stopPropagation()} className='flex min-h-[475px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
      <h3 className='text-lg font-bold text-kblack dark:text-kwhite'>Edit Board</h3>
      <form ref={formRef} onSubmit={handleSubmit} className='grid gap-2'>
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli'>Board Name</label>
        <input
          defaultValue={activeBoard.board_name}
          required
          type='text'
          id='boardName'
          name='boardName'
          placeholder='e.g. Web Design'
          className='h-10 w-full rounded border-[1px] border-solid border-kgrayli/30 py-2 pl-4 outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite'
        />
        <div className='mb-1 mt-4 grid gap-2'>
          <p className='text-sm font-bold text-kgrayli'>Board Columns</p>
          <div className='grid max-h-40 gap-2 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-kpurple'>
           {
            column && column.map(value =>
              <SubTaskCard
                handleDeleteColumn={handleDeleteColumn}
                colID={value._id}
                inputName={value._id}
                key={value._id}
                defValue={value.name}
                required={true}
              />
            )
           }
          </div>
        </div>

        <Button event={handleAddColumn} key='newColBtn' style='secondary' size='mb-4'><p>+ Add New Column</p></Button>
        <Button btnType='submit'event={handleSubmit} key='newBoardBtn' style='primarysm'><p>Save Changes</p></Button>
      </form>
      <ToastContainer/>
    </article>
  )
}

export { EditBoardModal }
