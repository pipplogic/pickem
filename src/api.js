import axios from 'axios'

class BadAuthentication extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'BadAuth'
  }
}

export function loadToken () {
  const authToken = window.localStorage.getItem('token')
  setToken(authToken)
  return authToken
}

function setToken (token) {
  if (token) {
    const authToken = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = authToken
    window.localStorage.setItem('token', token)
  } else {
    axios.defaults.headers.common['Authorization'] = undefined
    window.localStorage.removeItem('token')
  }
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      setToken(null)
      window.location.assign('/')
      throw new BadAuthentication('User not authenticated')
    }
    throw error
  }
)

export function loadWeek (year, week) {
  return axios
    .get(`/api/seasons/${year}/weeks/${week}`)
    .then(({ data }) => data)
}

export const registerUser = payload => axios.post('/api/register', payload)

export const forgotPasswordForUser = payload =>
  axios.post('/api/users/forgot-password', payload)

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

export function loadPools () {
  return axios.get('/api/pools').then(resp => {
    return resp.data.poolViews
  })
}

export function loadPoolInvites () {
  return axios.get('/api/pools?pending=true').then(resp => {
    return resp.data.filter(invite => invite.status === 'PENDING')
  })
}

export function loadPoolOptions ({ poolId, weekId = 1 }) {
  return axios
    .get(`/api/pools/${poolId}/options?weekId=${weekId}`)
    .then(({ data }) => data)
}

export function loadPicks ({ poolId, weekId }) {
  return axios
    .get(`/api/picks?poolId=${poolId}&weekId=${weekId}`)
    .then(({ data }) => {
      return data.map(({ gameId, chosenTeamId, confidence }) => ({
        gameId,
        teamId: chosenTeamId,
        score: confidence,
        poolId
      }))
    })
}

export function savePicks ({ poolId, picks }) {
  const gamePicks = picks
    .filter(game => game.gameId)
    .map(({ teamId, poolId, gameId, score }) => ({
      gameId,
      chosenTeamId: teamId,
      confidence: score
    }))

  const payload = { poolId, gamePicks }

  return axios.post('/api/picks', payload)
}

export function joinPool (poolId) {
  return axios.put(`/api/pools/${poolId}`, { joined: true })
}
