import React from 'react'

function SideBarButton ({ event }) {
  return (
    <button onClick={event} className='hidden w-14 h-12 md:grid place-content-center bg-kpurple absolute bottom-6 left-0 rounded-e-full hover:cursor-pointer hover:bg-opacity-90'>
      <img width="16" height="11" className='cursor-pointer' src="/styles/assets/icon-show-sidebar.svg" alt="icon-show-sidebar.svg" />
    </button>
  )
}

export { SideBarButton }
