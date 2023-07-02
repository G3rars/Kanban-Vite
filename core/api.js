import axios from 'axios'
import { formatData } from '../src/helpers/formatData'

const DB = 'https://bdd-kanban.vercel.app'

// TODO: Evitar problemas de CORS

const getBoards = async () => {
  return axios.get(`${DB}/board`) // Retornar la promesa
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
  return axios.post(`${DB}/column/${id}`, postData) // Retornar la promesa
    .then(response => { })
    .catch(error => { console.error(error.response.data) })
}

const deleteBoard = async (postData) => {
  return axios.delete(`${DB}/board`, postData) // Retornar la promesa
    .then(response => { })
    .catch(error => { console.error(error.response.data) })
}

const deleteColumn = async (postData, id) => {
  return axios.delete(`${DB}/column/${id}`, postData)
    .then(() => { })
    .catch(error => { console.error(error.response.data) })
}

export {
  getBoards,
  postBoard,
  postColumn,
  deleteBoard,
  deleteColumn
}
