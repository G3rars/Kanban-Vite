import { useState } from 'react'

function useTest () {
  const [saludo, setSaludo] = useState('hola')

  return {
    saludo,
    setSaludo
  }
}

export { useTest }
