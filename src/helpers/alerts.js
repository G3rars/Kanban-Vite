import { toast } from 'react-toastify'

function Alert (reqFunction, succesMsg) {
  toast.promise(
    reqFunction(),
    {
      pending: 'loading'
    }
  )
    .then((res) => {
      console.log(res)
      toast.success(succesMsg)
      // setTimeout(() => {
      // }, 3000)
    })
    .catch((err) => {
      toast.error(err)
    })
}
export { Alert }
