import React from 'react'
import { IconShowSidebar } from '../icons/Symbols'

function SideBarButton ({ event }) {
  return (
    <button onClick={event} className='absolute bottom-6 left-0 hidden h-12 w-14 place-content-center rounded-e-full bg-kpurple hover:cursor-pointer hover:bg-kpurple/90 md:grid'>
      <IconShowSidebar />
    </button>
  )
}

export { SideBarButton }
