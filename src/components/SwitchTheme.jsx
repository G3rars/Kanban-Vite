/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'

function ThemeSwitch ({ changeTheme }) {
  return (
      <label htmlFor="toggleB" className="flex cursor-pointer items-center">
        <div className="group relative">
          <input onClick={changeTheme} type="checkbox" id="toggleB" className="peer sr-only" />
          <div className="block h-5 w-10 rounded-full bg-kpurple group-hover:bg-kpurple/80"></div>
          <div className="dot absolute left-1 top-0.5 h-4 w-4 rounded-full bg-white transition duration-300 peer-checked:translate-x-full"></div>
        </div>
      </label>
  )
}

export { ThemeSwitch }
