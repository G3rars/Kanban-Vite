import React from 'react'

function ThemeSwitch ({ changeTheme }) {
  return (
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative group">
          <input onClick={changeTheme} type="checkbox" id="toggleB" className="sr-only peer" />
          <div className="block bg-kpurple w-10 h-5 rounded-full group-hover:bg-opacity-80"></div>
          <div className="dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition duration-300 peer-checked:translate-x-full"></div>
        </div>
      </label>
  )
}

export { ThemeSwitch }
