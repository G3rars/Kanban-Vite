import React from 'react'
import { createPortal } from 'react-dom'
function Portal ({ children, close, state }) {
  const renderCondition = state.delete || state.edit || state.task_details || state.new_board || state.new_task || state.error || state.loading
  return (
    <>
      {renderCondition && createPortal(
        <section onClick={close} className={`absolute w-full h-full z-40 ${state.loading ? 'flex justify-end items-end p-10' : 'grid place-content-center bg-black bg-opacity-50'}`}>
          {children}
        </section>,
        document.body
      )}
    </>
  )
}

export { Portal }
