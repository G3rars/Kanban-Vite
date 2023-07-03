import React from 'react'

function Main ({ children }) {
  return (
    <main className='bg-kcianli min-w-full h-full px-5 py-6 flex items-start flex-auto gap-6 overflow-x-scroll'>
      {children }
    </main>
  )
}

export { Main }
