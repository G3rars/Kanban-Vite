import React from 'react'
import { createPortal } from 'react-dom'
function Portal (props) {
  const renderCondition = props.state.delete ||
    props.state.edit ||
    props.state.task_details ||
    props.state.new_board ||
    props.state.new_task ||
    props.state.edit_task ||
    props.state.error ||
    props.state.loading

  return (
    <>
      {renderCondition && createPortal(
        <section className={`absolute z-30 h-full w-full ${props.state.loading ? 'flex items-end justify-end p-10' : 'grid place-content-center bg-black/50'}`}>
          { props.state.delete && props.onDelete() }
          { props.state.edit && props.onEditBoard() }
          { (props.state.new_task || props.state.edit_task) && props.onAddTask() }
          { props.state.task_details && props.onViewTask() }
          { props.state.new_board && props.onNewBoard() }
          { props.state.error && props.onError() }
          { props.state.loading && props.onLoading() }
        </section>,
        document.body
      )}
    </>
  )
}

export { Portal }
