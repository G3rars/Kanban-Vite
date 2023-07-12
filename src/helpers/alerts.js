import { toast } from 'react-toastify'

const Alert = async (promise, loadingId, successMsg) => {
  try {
    await promise()
    toast.update(loadingId, { render: successMsg, type: 'success', autoClose: 2500, isLoading: false })
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data || 'An error occurred'
    toast.update(loadingId, { render: errorMessage, type: 'error', autoClose: 2500, isLoading: false })
  }
}

export { Alert }
