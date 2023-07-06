import React from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'

export default function TaskModal () {
  return (
    <>
      <section className='absolute flex h-full w-full items-center justify-center bg-black/60'>
        <div className='h-[659px] w-[343px] rounded-lg bg-kwhite shadow-lg md:h-[675px] md:w-[480px]'>
          <div className='px-6'>
            <h3 className='pt-5 text-lg font-bold'>Add New Task</h3>
            <form action=''>
              <p className='pb-1 pt-3 text-xs font-bold opacity-60'>Title</p>
              <input
                className='h-[40px] w-full rounded-md border-[1px] pl-4 text-sm'
                type='text'
                placeholder='e.g. Take coffee break'
              />
              <p className='pb-1 pt-4 text-xs font-bold opacity-60'>Description</p>
              <textarea
                className='h-[112px] w-full rounded-md border-[1px] pl-4 pr-2 pt-4 text-sm'
                placeholder='e.g. It’s always good to take a break. This
                        15 minute break will  recharge the batteries
                        a little.'
              />
              <p className='pb-1 pt-4 text-xs font-bold opacity-60'>SubTask</p>
              <div className='mb-5 h-[120px] overflow-auto scrollbar-thin'>
                <SubTaskCard />
                <SubTaskCard />
                <SubTaskCard />
                <SubTaskCard />
                <SubTaskCard />
                <SubTaskCard />
              </div>
              <Button style='secondary' size='full'>+add new task</Button>
              <p className='pb-1 pt-3 text-xs font-bold opacity-60'>Status</p>
              <select name='status' className='mb-5 h-[40px] w-full rounded-md border-[1px]'>
                <option value=''>Selecciona una opción</option>
                <option value='TODO'>TODO</option>
                <option value='DOING'>DOING</option>
                <option value='DONE'>DONE</option>
              </select>
              <div><Button style='primarysm'>create task</Button></div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
