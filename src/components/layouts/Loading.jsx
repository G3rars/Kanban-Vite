import React from 'react'

import '../../style.css'

function Loading () {
  return (
      <div className="spinner-container">
        <svg width="87" height="50" viewBox="0 0 87 50" xmlns="http://www.w3.org/2000/svg">
          <g id="loader_bars" fill="#635FC7" fillRule="evenodd">
            <g id="upperbar">
              <rect id="1_2" width="67" height="14" rx="7"/>
            </g>
            <g id="middlebar">
              <rect id="Rectangle 2" x="20" y="18" width="67" height="14" rx="7" opacity=".75"/>
            </g>
            <g id="bottombar">
              <rect id="3_2" y="36" width="67" height="14" rx="7" opacity=".5"/>
            </g>
          </g>
        </svg>
      </div>
  )
}

export { Loading }
