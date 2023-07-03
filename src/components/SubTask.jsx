import React from 'react'

function Subtask ({ id, content }) {
  return (
    <div className='w-full min-h-[60px] bg-kcianli rounded flex items-center gap-4 p-3'>
      <input
        type='checkbox'
        name='subtasks'
        id={id}
        className='form-checkbox text-kpurple h-4 w-4 peer'
      />
      <label htmlFor={id} className='text-sm text-kblack leading-normal font-bold peer-checked:opacity-30 peer-checked:line-through'>{content.name}</label>
    </div>
  )
}

export { Subtask }
