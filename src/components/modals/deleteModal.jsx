import React from 'react'
import Button from '../button'

function DeleteModal ({ close, deleteBoard, dataTask, handleDeleteTask, activeBoard }) {
  console.log(dataTask)
  return (
    <div className='absolute z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-kred'>
      <div onClick={e => e.stopPropagation()} className='h-[284px] w-[343px] rounded-md bg-kwhite px-6 shadow-md dark:bg-kblackli md:h-[220px] md:w-[480px]'>
        <p className='pb-5 pt-6 text-lg font-bold capitalize text-kred'>{dataTask ? 'delete this card?' : 'delete this board?'}</p>
        <p className='text-sm leading-6 text-kwhite/60 dark:text-kwhite/60'>
        Are you sure you want to delete the {dataTask ? `${dataTask.title} card?` : `${activeBoard.board_name} board?` } This action will remove all columns and tasks and cannot be reversed.</p>
        <div className='flex w-full flex-col gap-4 py-5 md:flex-row md:justify-center'>
          <Button event={!dataTask ? deleteBoard : handleDeleteTask} style='delete'>delete</Button>
          <Button event={close} style='secondary'>cancel</Button>
        </div>
      </div>
    </div>
  )
}

export { DeleteModal }
