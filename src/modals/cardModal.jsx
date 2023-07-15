import React from 'react'

function CardModal ({ event, keyData, type, content }) {
  function handleCLick () {
    event(keyData)
  }

  const styles = {
    active: 'bg-kpurple text-kwhite',
    inactive: 'text-kgrayli hover:bg-kcian hover:text-kpurple dark:hover:bg-kwhite',
    special: 'text-kpurple'
  }

  const SVGStyle = {
    active: 'fill-kwhite',
    inactive: 'fill-kgrayli group-hover:fill-kpurple',
    special: 'fill-kpurple'
  }

  return (
    <button
      onClick={handleCLick}
      className={`group flex h-[48px] w-full max-w-[268px] cursor-pointer items-center rounded-r-full py-4 pl-4 duration-200 ${styles[type]}`}>
        <div className=' ml-3 mr-2 flex items-center justify-center'>
          <svg width="16" height="16" viewBox='0 0 16 16' className={SVGStyle[type]} xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
          </svg>
        </div>
        <p className='text-md font-bold capitalize'>
          {content}
        </p>
    </button>
  )
}

export { CardModal }
