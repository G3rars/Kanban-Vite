import { useState } from 'react'
import { toast } from 'react-toastify'

// esto todavia no funca
function useAlerts () {
  const [toastifyID, setToastifyID] = useState(null)

  function loadingAlert () {
    const id = toast.loading('Please wait...')
    setToastifyID(id)
  }

  function successAlert ({ msg }) {
    if (toastifyID !== null) toast.update(toastifyID, { render: msg, type: 'success', isLoading: false })
  }

  function errorAlert ({ msg }) {
    if (toastifyID !== null) toast.update(toastifyID, { render: msg, type: 'error', isLoading: false })
  }

  return {
    loadingAlert,
    successAlert,
    errorAlert
  }
}

export { useAlerts }
