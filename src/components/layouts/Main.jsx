import React from 'react'
import MiniMenu from '../modals/MiniMenu'

function Main ({ children, onMiniMenu, openMiniMenu, close }) {
  return (
    <main className={`relative flex h-full min-w-full flex-auto items-start gap-6 bg-kcianli px-5 py-6 ${MiniMenu ? 'overflow-x-hidden' : 'overflow-x-scroll'}`}>
      {children }
      {openMiniMenu &&
        <div onClick={close} className='absolute right-0 top-0 z-40 grid h-full w-full place-content-center bg-black/50'>
          {onMiniMenu()}
        </div>
      }
    </main>
  )
}

export { Main }
