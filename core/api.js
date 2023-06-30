import axios from 'axios'

const DB = 'https://bdd-kanban.vercel.app'

// TODO: Evitar problemas de CORS

const getBoards = () => {
  return axios.get(`${DB}/board`) // Retornar la promesa
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error.response.data)
    })
}

const postBoard = (postData) => {
  return axios.post(`${DB}/board`, postData) // Retornar la promesa
    .then(response => {
      alert('todo bien')
    })
    .catch(error => {
      console.error(error.response.data)
    })
}

const postColumn = (postData, id) => {
  return axios.post(`${DB}/board/${id}`, postData) // Retornar la promesa
    .then(response => {
      alert('todo bien')
    })
    .catch(error => {
      console.error(error.response.data)
    })
}

export { getBoards, postBoard, postColumn }
