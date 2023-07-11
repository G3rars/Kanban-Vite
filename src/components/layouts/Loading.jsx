import React from 'react'
import { LogoLoading } from '../icons/Logos'

import '../../style.css'

function Loading () {
  return (
      <div className="spinner-container">
        <LogoLoading />
      </div>
  )
}

export { Loading }
