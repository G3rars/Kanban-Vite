import React from 'react'
import Button from '../button'

function DeleteModal ({ close, deleteBoard }) {
  return (
        <div className='bg-kwhite w-[343px] h-[284px] md:w-[480px] md:h-[220px] rounded-md shadow-md pl-6 pr-6'>
          <p className='text-lg pt-6 font-bold capitalize text-kred pb-5'>delete this board?</p>
          <p className='text-sm opacity-60 leading-6'>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
          <div className='flex flex-col md:flex-row md:justify-center py-5 gap-4 w-full'>
            <Button event={deleteBoard} style='delete'>delete</Button>
            <Button event={close} style='secondary'>cancel</Button>
          </div>
        </div>
  )
}

export { DeleteModal }
