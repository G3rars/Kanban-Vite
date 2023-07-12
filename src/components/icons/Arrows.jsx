import React from 'react'

function ArrowDown () {
  return (
    <svg className='h-3 w-4' width="12" height="7" viewBox='0 0 12 7' xmlns="http://www.w3.org/2000/svg">
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/>
    </svg>
  )
}

function ArrowUp () {
  return (
    <svg className='h-3 w-4' width="12" height="7" viewBox='0 0 12 7' xmlns="http://www.w3.org/2000/svg">
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6"/>
    </svg>
  )
}

export { ArrowDown, ArrowUp }
