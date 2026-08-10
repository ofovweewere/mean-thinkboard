import axios from 'axios'

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : '/api'
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('unauthorized'))
    }

    return Promise.reject(error)
  },
)

export default api
