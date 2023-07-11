import React from 'react'

function ThemeSwitch ({ changeTheme, darkTheme }) {
  return (
      <label htmlFor="toggleB" className="flex cursor-pointer items-center transition duration-300">
        <button onClick={changeTheme} className="group relative">
          <input onChange={changeTheme} type="checkbox" id="toggleB" className="peer sr-only" />
          <div className="block h-5 w-10 rounded-full bg-kpurple group-hover:bg-kpurple/80"></div>
          <div className={`absolute left-1 top-0.5 h-4 w-4 rounded-full bg-white transition duration-300 ${darkTheme && 'translate-x-full'}`}></div>
        </button>
      </label>
  )
}

export { ThemeSwitch }
