import axios from 'axios'

const DB = 'https://bdd-kanban.vercel.app'

const getBoards = async () => {
  return axios.get(`${DB}/board`)
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data) })
}

const postBoard = async (postData) => {
  return axios.post(`${DB}/board`, postData)
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data); throw error })
}

const putBoard = async (idBoard, postData) => {
  return axios.put(`${DB}/board/${idBoard}`, postData)
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data); throw error })
}

const postColumn = async (postData, id) => {
  return axios.post(`${DB}/column/${id}`, postData)
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data) })
}
const putColumn = async (idColumn, postData) => {
  return axios.put(`${DB}/column/${idColumn}`, postData)
    .then(response => { })
    .catch(error => { console.error(error.response.data) })
}

const deleteColumn = async (id) => {
  return axios.delete(`${DB}/column/${id}`)
    .then(() => { console.log('Se ha borrado la columna con id: ', id) })
    .catch(error => { console.error(error.response.data) })
}

const postCard = async (postData, id) => {
  return axios.post(`${DB}/card/${id}`, postData)
    .then(response => response.data)
    .catch(error => {
      console.error(error.response.data)
      throw error // Rechazar la promesa con el error
    })
}
const getCard = async () => {
  return axios.get(`${DB}/card`)
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data) })
}

const deleteCard = async (id) => {
  return axios.delete(`${DB}/card/${id}`)
    .then(response => { })
    .catch(error => { console.error(error.response.data) })
}

const putCard = async (cardId, postData) => {
  return axios.put(`${DB}/card/${cardId}`, postData)
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data); throw error })
}

const deleteBoard = async (id) => {
  return axios.delete(`${DB}/board/${id}`)
    .then(response => { console.log(response) })
    .catch(error => { console.error(error.response.data) })
}
export {
  getBoards,
  postBoard,
  postColumn,
  deleteBoard,
  deleteColumn,
  postCard,
  putCard,
  deleteCard,
  getCard,
  putBoard,
  putColumn
}
