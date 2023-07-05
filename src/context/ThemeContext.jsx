import React, { createContext, useState } from 'react'

const ThemeContext = createContext(false)

function ThemeProvider ({ children }) {
  const [darkTheme, setDarkTheme] = useState(false)

  function changeTheme () {
    setDarkTheme(prevState => !prevState)
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
