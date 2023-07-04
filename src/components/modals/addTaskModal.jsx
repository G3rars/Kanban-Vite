import React from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'

export default function AddTaskModal () {
  return (
    <>
      <section onClick={e => e.stopPropagation()} className='w-screen max-w-[350px] min-h-fit rounded-lg bg-kwhite p-6 md:max-w-[480px]'>
        <h3 className='font-bold text-lg'>Add New Task</h3>
        <form className='grid w-full'>
          <label htmlFor='title' className='opacity-60 font-bold text-xs pt-3 pb-1'>Title</label>
          <input
            className='w-full h-[40px] border-[1px] rounded-md text-md font-medium leading-6 pl-4 border-solid border-kgrayli border-opacity-30'
            type='text'
            name='title'
            placeholder='e.g. Take coffee break'
          />
          <label htmlFor='description' className='opacity-60 font-bold text-xs pt-5 pb-1'>Description</label>
          <textarea
          name='description'
            className='w-full h-[112px] border-[1px] rounded-md border-solid border-kgrayli border-opacity-30 text-sm font-medium'
            placeholder='e.g. It’s always good to take a break. This
                    15 minute break will  recharge the batteries
                    a little.'
          />
          <label htmlFor='subtask' className='opacity-60 font-bold text-xs pt-5 pb-1'>SubTask</label>
          <div className='text-md font-medium'>
            <SubTaskCard />
            <SubTaskCard />
          </div>
          <Button
            size={''}
            style='secondary'
            key={'addNewTaskBtn'}
          >
            +add new task
          </Button>
          <label htmlFor='status' className='opacity-60 font-bold text-xs pt-3 pb-1'>Status</label>
          <select name='status' className='w-full h-[40px] border-[1px] rounded-md border-solid border-kgrayli border-opacity-30 text-sm font-medium'>
            <option defaultValue='TODO'>TODO</option>
            <option value='DOING'>DOING</option>
            <option value='DONE'>DONE</option>
          </select>
          <Button
            style='primarysm'
            key={'createTask'}
            size={'mt-6'}
          >
            Create Task
          </Button>
        </form>
      </section>
    </>
  )
}
