import React from 'react'

function Main ({ children, onMiniMenu, openMiniMenu, close }) {
  return (
    <main className={`relative flex h-full min-w-full flex-auto flex-nowrap items-start space-x-3 bg-kcianli px-5 py-6 transition duration-500 dark:bg-kblackli ${openMiniMenu ? 'overflow-x-hidden' : 'overflow-x-scroll'}`}>
      {children }
      {openMiniMenu &&
        <div onClick={close} className='fixed right-0 top-0 z-40 grid h-full w-full place-content-center bg-black/50 '>
          {onMiniMenu()}
        </div>
      }
    </main>
  )
}

export { Main }
