import React from 'react'
import MiniMenu from '../modals/MiniMenu'

function Main ({ children, onMiniMenu, openMiniMenu, close }) {
  return (
    <main className={`bg-kcianli min-w-full h-full px-5 py-6 flex items-start flex-auto gap-6 relative ${MiniMenu ? 'overflow-x-hidden' : 'overflow-x-scroll'}}`}>
      {children }
      {openMiniMenu &&
        <div onClick={close} className='top-0 right-0 absolute w-full h-full z-40 grid place-content-center bg-black bg-opacity-50'>
          {onMiniMenu()}
        </div>
      }
    </main>
  )
}

export { Main }
