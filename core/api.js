import axios from 'axios'

const DB = 'https://bdd-kanban.vercel.app'

// TODO: Evitar problemas de CORS

const GET = () => {
  return axios.get(`${DB}/board`) // Retornar la promesa
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error.response.data)
    })
}

export { GET }
