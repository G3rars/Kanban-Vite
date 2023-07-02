import axios from 'axios'
import { formatData } from '../src/helpers/formatData'

const DB = 'https://bdd-kanban.vercel.app'

// TODO: Evitar problemas de CORS

const getBoards = async () => {
  return axios.get(`${DB}/board`)
    .then(response => {
      const data = formatData(response.data)
      return data
    })
    .catch(error => { console.error(error.response.data) })
}

const postBoard = async (postData) => {
  return axios.post(`${DB}/board`, postData) // Retornar la promesa
    .then(response => { return response.data })
    .catch(error => { console.error(error.response.data) })
}

const postColumn = async (postData, id) => {
  return axios.post(`${DB}/column/${id}`, postData)
    .then(response => { })
    .catch(error => { console.error(error.response.data) })
}

const deleteBoard = async (id) => {
  return axios.delete(`${DB}/board/${id}`)
    .then(response => { console.log(response) })
    .catch(error => { console.error(error.response.data) })
}

const deleteColumn = async (id) => {
  return axios.delete(`${DB}/column/${id}`)
    .then(() => { console.log('Se ha borrado la columna con id: ', id) })
    .catch(error => { console.error(error.response.data) })
}

export {
  getBoards,
  postBoard,
  postColumn,
  deleteBoard,
  deleteColumn
}
