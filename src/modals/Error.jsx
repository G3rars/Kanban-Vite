import React from 'react'
import { Button } from '../components/button'

function Error () {
  return (
    <div className='h-[284px] w-[343px] rounded-md bg-kwhite px-6 shadow-md md:h-[220px] md:w-[480px]'>
      <p className='pb-5 pt-6 text-lg font-bold capitalize text-kred'>Something went wrong</p>
      <p className='text-sm leading-6 opacity-60'>Reload the page to fix it, otherwise the developers were too lazy and didn`t come up with something else to fix the problem, sorry :C.</p>
      <div className='flex w-full flex-col gap-4 py-5 md:flex-row md:justify-center'>
        <Button event={() => window.location.reload()} style='delete'>Reload Page</Button>
      </div>
    </div>
  )
}

export { Error }
