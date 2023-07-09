import { toast } from 'react-toastify'

function Alert (reqFunction, succesMsg) {
  toast.promise(
    reqFunction(),
    {
      pending: 'loading'
    }
  )
    .then((res) => {
      toast.success(succesMsg)
      setTimeout(() => {
        location.reload()
      }, 3000)
    })
    .catch((res) => {
      toast.error(res.response.data)
    })
}
export { Alert }
