import React from 'react'
import Button from '../button'

function Error ({ reload }) {
  return (
    <div onClick={e => e.stopPropagation()} className='bg-kwhite w-[343px] h-[284px] md:w-[480px] md:h-[220px] rounded-md shadow-md pl-6 pr-6'>
      <p className='text-lg pt-6 font-bold capitalize text-kred pb-5'>Something went wrong</p>
      <p className='text-sm opacity-60 leading-6'>Reload the page to fix it, otherwise the developers were too lazy and didn`t come up with something else to fix the problem, sorry :C.</p>
      <div className='flex flex-col md:flex-row md:justify-center py-5 gap-4 w-full'>
        <Button event={reload} style='delete'>Reload Page</Button>
      </div>
    </div>
  )
}

export { Error }
