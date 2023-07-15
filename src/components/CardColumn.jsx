import React from 'react'

function CardColumn ({ children, data, index }) {
  const colorList = ['bg-cyan-500', 'bg-yellow-300', 'bg-fuchsia-400', 'bg-pink-400', 'bg-purple-700', 'bg-red-600', 'bg-emerald-300']

  function getColor () {
    if (index > colorList.length - 1) {
      const newIndex = Math.round(index % colorList.length)
      return colorList[newIndex]
    }
    return colorList[index]
  }

  return (
    <section className='grid w-screen min-w-[260px] max-w-[280px]'>
      <div className='flex h-4 items-center justify-start gap-2'>
        <div className={`h-4 w-4 rounded-full ${getColor()}`} />
        <p className='text-base font-bold uppercase tracking-widest text-kgray dark:text-kgrayli'>{data.name}</p>
      </div>
        <div className='mt-4 grid max-h-[78vh] gap-6 overflow-y-scroll pb-6 pr-3 pt-1 scrollbar-thin scrollbar-thumb-kcian'>{children}</div>
    </section>
  )
}

export { CardColumn }
