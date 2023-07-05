import { useState } from 'react'

function useTheme () {
  const [darkTheme, setDarkTheme] = useState(false)

  function updateTheme () {
    const root = window.document.documentElement
    root.classList.toggle('dark')
  }

  function changeTheme () {
    setDarkTheme(prevState => !prevState)
    updateTheme()
  }

  return { darkTheme, changeTheme }
}

export { useTheme }
