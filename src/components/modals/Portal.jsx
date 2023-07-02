import React from 'react'

function Portal ({ children }) {
  return (
        <section className='grid place-content-center absolute bg-black bg-opacity-50 w-full h-full z-40'>
          {children}
        </section>
  )
}

export { Portal }
