'use client'
import React, { FormEventHandler } from 'react'
import Card from '@/app/components/card'

export default function Start () {
  async function sendData (data: any) {
    await fetch('/api/set_task', {
      method: 'POST',
      body: data
    })
  }

  const handleSubmit: FormEventHandler = (e: Event) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    sendData(data)
  }

  return (
    <>
      <h2 className='text-kred'>Pagina de Bienvenida</h2>
      <Card />
      <form onSubmit={handleSubmit}>
        <input type='text' name='task' />
        <button>submit</button>
      </form>

    </>
  )
}
