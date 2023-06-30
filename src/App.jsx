import { useState } from 'react'
import TabletModal from './components/tabletModal'
import HeaderComp from './components/header'


function App() {

  const [modalTablet, setModalTablet] = useState(false)
  const handleClick = () => setModalTablet(prevState => !prevState)

  return (
    <>
      <div className='flex flex-col h-[100svh]'>
        <TabletModal handleClick={handleClick} modalTable={modalTablet} />
        <HeaderComp handleClick={handleClick} />
        <h1 className='bg-red-500'>Hola</h1>
        {/* aca faltan cosas */}
      </div>
    </>
  )
}

export default App
