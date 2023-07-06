import React from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'

function EditBoardModal () {
  return (
    <article onClick={e => e.stopPropagation()} className='flex min-h-[475px] w-screen max-w-[345px] flex-col gap-6 rounded-md bg-kwhite p-6 md:max-w-[480px]'>
      <h3 className='text-lg font-bold text-kblack'>Edit Board</h3>
      <form className='grid gap-2'>
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli'>Board Name</label>
        <input type='text' id='boardName' name='boardName' placeholder='e.g. Web Design' className='h-10 w-full rounded border-[1px] border-solid border-kgrayli/30 py-2 pl-4 outline-kpurple' />
        <div className='mb-1 mt-4 grid gap-2'>
          <p className='text-sm font-bold text-kgrayli'>Board Columns</p>
          <div className='grid max-h-40 gap-2 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-kpurple'>
            <SubTaskCard />
            <SubTaskCard />
            <SubTaskCard />
            <SubTaskCard />
          </div>
        </div>

        <Button key='newColBtn' style='secondary' size='mb-4'><p>+ Add New Column</p></Button>
        <Button key='newBoardBtn' style='primarysm'><p>Save Changes</p></Button>
      </form>
    </article>
  )
}

export { EditBoardModal }
