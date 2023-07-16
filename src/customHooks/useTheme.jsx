import { useState, useEffect } from 'react'
import { useStorage } from './useStorage'
import { USER_CONFIG } from '../helpers/contants'

function useTheme () {
  const { getSavedItem, removeItem, saveItem } = useStorage({ storageName: USER_CONFIG.THEME })
  const [darkTheme, setDarkTheme] = useState(getSavedItem() === 'dark')

  useEffect(() => {
    if (getSavedItem() === 'dark') {
      const root = window.document.documentElement
      root.classList.add('dark')
    }
  }, [])

  function updateTheme () {
    const root = window.document.documentElement
    root.classList.toggle('dark')
    return root.classList.contains('dark')
  }

  function changeTheme () {
    setDarkTheme(prevState => !prevState)
    const isDark = updateTheme()
    isDark
      ? saveItem('dark')
      : removeItem()
  }

  return { darkTheme, changeTheme }
}

export { useTheme }
