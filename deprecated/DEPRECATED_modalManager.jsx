import React, { useState } from 'react'
import Modal1 from '../src/components/deleteModal.jsx'
import Modal2 from '../src/components/addTaskModal.jsx'

const ModalManager = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalName) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const renderModal = () => {
    switch (activeModal) {
      // Agrega los casos para cada modal que deseas manejar
      case 'modal1':
        return <Modal1 closeModal={closeModal} />
      case 'modal2':
        return <Modal2 closeModal={closeModal} />
      // ...
      default:
        return null
    }
  }

  return (
    <>
      {children(openModal)} {/* Renderiza los componentes hijos pasando la función openModal como prop */}
      {renderModal()} {/* Renderiza el modal activo */}
    </>
  )
}

export default ModalManager
