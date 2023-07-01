import React from 'react'
import { DeleteModal } from './deleteModal'

function Portal ({ closeSettings }) {
  return (
      <DeleteModal closeSettings={closeSettings} />
  )
}

export { Portal }
