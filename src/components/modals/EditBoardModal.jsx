import React, { useRef, useState } from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'
import { putBoard } from '../../../core/api'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'
import { Alert } from '../../helpers/alerts'
import { IconCross } from '../icons/Symbols'


function EditBoardModal ({ activeBoard, setActiveBoard, close, updateBoards }) {
  const [column, setColumn] = useState(activeBoard.columns)
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
    const loadingId = toast.loading('Please wait...', { autoClose: false })
    e.preventDefault()

    try {
      const formData = Object.fromEntries(new FormData(formRef.current))
      const dataArr = Object.entries(formData)
      const boardName = dataArr.shift()
      const filterColumns = dataArr.map(([id, value]) => {
        if (id.startsWith('col_')) {
          return { name: value }
        }
        return { name: value, _id: id }
      })
      const newBoard = await putBoard(activeBoard._id, { name: boardName[1], columns: filterColumns })
      await Promise.all([newBoard])
      setActiveBoard(newBoard)
      Alert(() => Promise.resolve(), loadingId, 'The board has been update successfully')
      setTimeout(() => {
        close()
      }, 2500)
    } catch (error) {
      Alert(() => Promise.reject(error), loadingId)
    }

  }

  return (
    <article className='flex min-h-[475px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 dark:bg-kblackli md:max-w-[480px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold text-kblack dark:text-kwhite'>Edit Board</h3>
        <button onClick={close} className='h-4 w-4'><IconCross /></button>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='flex h-full flex-col justify-start gap-2'
      >
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli'>Board Name</label>
        <input
          defaultValue={activeBoard.name}
          maxLength="30"
          required
          type='text'
          id='boardName'
          name='boardName'
          placeholder='e.g. Web Design'
          className='h-10 w-full rounded border-[1px] border-solid border-kgrayli/30 py-2 pl-4 outline-kpurple invalid:border-kred dark:bg-transparent dark:text-kwhite'
        />
        <div className='mb-1 grid gap-2'>
          <p className='text-sm font-bold text-kgrayli'>Board Columns</p>
          <div className='grid max-h-40 gap-2 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-kpurple'>
           {
            column && column.map(value =>
              <SubTaskCard
                key={value._id}
                colID={value._id}
                inputName={value._id}
                max={'15'}
                defValue={value.name}
                handleDeleteColumn={handleDeleteColumn}
              />
            )
           }
          </div>
        </div>

        <Button event={handleAddColumn} key='newColBtn' style='secondary' size=' mt-auto mb-2'><p>+ Add New Column</p></Button>
        <Button btnType='submit' key='newBoardBtn' style='primarysm'><p>Save Changes</p></Button>
      </form>
     <ToastContainer/>
    </article>
  )
}

export { EditBoardModal }
