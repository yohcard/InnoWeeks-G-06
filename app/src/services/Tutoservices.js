import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3901/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  getExercises() {
    return apiClient.get('/exercises')
  },
  getExercise(id) {
    return apiClient.get('/exercises/' + id)
  },
  getExerciseTitle(title) {
    return apiClient.get(`/exercises/${title}`)
  },
  createExercise(newExercise) {
    return apiClient.post('/exercises/', newExercise)
  },
  getPrerequisite() {
    return apiClient.get('/prerequisite')
  },
  getExePrerequisites() {
    return apiClient.get('/belong/allprerequis')
  },
  login(credentials) {
    return apiClient.post('/log', credentials)
  },
  loginPublic() {
    return apiClient.get('/log/public-token')
  }
}
