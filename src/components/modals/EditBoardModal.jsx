import React from 'react'
import SubTaskCard from '../subTaskCard'
import Button from '../button'

function EditBoardModal () {
  return (
    <article onClick={e => e.stopPropagation()} className='bg-kwhite w-screen max-w-[345px] md:max-w-[480px] min-h-[475px] p-6 rounded-md flex flex-col gap-6'>
      <h3 className='text-lg font-bold text-kblack'>Edit Board</h3>
      <form className='grid gap-2'>
        <label htmlFor='boardName' className='text-sm font-bold text-kgrayli'>Board Name</label>
        <input type='text' id='boardName' name='boardName' placeholder='e.g. Web Design' className='w-full h-10 border-solid border-kgrayli border-[1px] rounded border-opacity-25 pl-4 py-2 outline-kpurple' />
        <div className='grid gap-2 mt-4 mb-1'>
          <p className='text-sm font-bold text-kgrayli'>Board Columns</p>
          <div className='grid gap-2 overflow-y-auto max-h-40 scrollbar-thin scrollbar-thumb-kpurple pr-4'>
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
