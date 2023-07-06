import React from 'react'

function Subtask ({ id, content, check = false }) {
  return (
    <div className='flex min-h-[60px] w-full items-center gap-4 rounded bg-kcianli p-3'>
      <input
        type='checkbox'
        name='subtasks'
        defaultChecked={check}
        id={id}
        className='peer form-checkbox h-4 w-4 text-kpurple'
      />
      <label
        htmlFor={id}
        className='text-sm font-bold leading-normal text-kblack peer-checked:line-through peer-checked:opacity-30'
        >
          {content.name}
        </label>
    </div>
  )
}

export { Subtask }
