import axios from 'axios'

let authToken = null

class BadAuthentication extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'BadAuth'
  }
}

export function loadToken () {
  authToken = window.localStorage.getItem('token')
  return authToken
}

function setToken (token) {
  if (token) {
    authToken = `Bearer ${token}`
    window.localStorage.setItem('token', authToken)
  } else {
    authToken = null
    window.localStorage.removeItem('token')
  }
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      setToken(null)
      throw new BadAuthentication('User not authenticated')
    }
    throw error
  }
)

export function loadWeek (year, week) {
  return axios
    .get(`/api/seasons/${year}/weeks/${week}`, {
      headers: {
        Authorization: authToken
      }
    })
    .then(({ data: { games } }) => {
      if (!games) {
        throw new Error('Error loading week')
      }
      return games
    })
}

export const registerUser = payload => axios.post('/api/register', payload)

export function login ({ user, pass }) {
  return axios
    .post('/api/login', { username: user, password: pass })
    .then(resp => {
      setToken(resp.data)
    })
}

export function confirmUser (payload) {
  return axios.post('/api/users/confirm', payload)
}
