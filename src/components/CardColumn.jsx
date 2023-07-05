import React from 'react'

function CardColumn ({ children, data }) {
  return (
    <section className='grid w-full max-w-[280px]'>
      <div className='flex h-4 justify-start gap-2 items-center'>
        <div className='h-4 rounded-full w-4 bg-cyan-500' />
        <p className='font-bold text-kgray text-base tracking-widest uppercase'>{data.name}</p>
      </div>
        {children}
    </section>
  )
}

export { CardColumn }
