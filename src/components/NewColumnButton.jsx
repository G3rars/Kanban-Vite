import React from 'react'

function NewColumnButton ({ event }) {
  return (
    <>
        <section onClick={event}>
            <div className='bg-kcian w-screen opacity-40 min-w-[250px] rounded-lg max-w-[280px] h-[80vh] flex justify-center items-center font-extrabold text-2xl cursor-pointer hover:opacity-60 duration-300'>
                <p>+New Column</p>
            </div>
        </section>
    </>
  )
}

export default NewColumnButton
