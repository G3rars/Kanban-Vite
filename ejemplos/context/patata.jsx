import React, { createContext, useState } from 'react'

const PatataContext = createContext()

function PatataProvider ({ children }) {
  const [contador, setContador] = useState(1)

  function cambiarSaludo () {
    setContador(prevState => ++prevState)
  }

  return (
    <PatataContext.Provider value={{ contador, cambiarSaludo }}>
      {children}
    </PatataContext.Provider>
  )
}

export { PatataProvider, PatataContext }
