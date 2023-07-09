import React from 'react'

function CardColumn ({ children, data }) {
  // TODO: ver el tema de los puntos de colores
  return (
    <section className='grid w-full max-w-[280px]'>
      <div className='flex h-4 items-center justify-start gap-2'>
        <div className='h-4 w-4 rounded-full bg-cyan-500' />
        <p className='text-base font-bold uppercase tracking-widest text-kgray dark:text-kgrayli'>{data.name}</p>
      </div>
        {children}
    </section>
  )
}

export { CardColumn }
