import React, { useState } from 'react'

function Subtask ({ id, content, check, handleCheckbox }) {
  const [status, setStatus] = useState(check)
  const handleStatus = () => {
    setStatus(prevState => !prevState)
    handleCheckbox(id, !status)
  }
  return (
    <div className='flex min-h-[60px] w-full items-center gap-4 rounded border-[1px] bg-kcianli p-3 dark:border-solid dark:border-kgrayli/30 dark:bg-kblackli'>
      <input
      onChange={handleStatus}
        type='checkbox'
        name={id}
        defaultChecked={check}
        id={id}
        className='peer form-checkbox h-4 w-4 text-kpurple outline-kpurple'
      />
      <label
        htmlFor={id}
        className='text-sm font-bold leading-normal text-kblack peer-checked:line-through peer-checked:opacity-30 dark:text-kwhite'
        >
          {content.name}
        </label>
    </div>
  )
}

export { Subtask }
