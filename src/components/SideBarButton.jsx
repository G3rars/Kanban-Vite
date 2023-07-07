import React from 'react'

function SideBarButton ({ event }) {
  return (
    <button onClick={event} className='absolute bottom-6 left-0 hidden h-12 w-14 place-content-center rounded-e-full bg-kpurple hover:cursor-pointer hover:bg-kpurple/90 md:grid'>
      <img width="16" height="11" className='cursor-pointer' src="/styles/assets/icon-show-sidebar.svg" alt="icon-show-sidebar.svg" />
    </button>
  )
}

export { SideBarButton }
