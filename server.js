const path = require('path')
const express = require('express')
const compression = require('compression')
const request = require('request')
const { redirectToHTTPS } = require('express-http-to-https')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const {
  PORT = 3002,
  API_HOST,
  API_HOST_USERNAME,
  API_HOST_PASSWORD
} = process.env

if (!API_HOST_USERNAME || !API_HOST_PASSWORD) {
  console.warn('No server authentication provided')
}

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'production') {
  app.use(redirectToHTTPS())
  app.use(compression())
}

app.use(express.static(path.join(__dirname, '/build')))

app.post('/api/login', (req, res) => {
  const {
    body: { username, password }
  } = req

  request(
    {
      url: `${API_HOST}/oauth/token`,
      method: 'POST',
      auth: {
        username: API_HOST_USERNAME,
        password: API_HOST_PASSWORD
      },
      form: {
        grant_type: 'password',
        username,
        password
      }
    },
    (error, response, body) => {
      const statusCode =
        (error && 502) || (response && response.statusCode) || 502
      res.status(statusCode)

      let respBody
      try {
        respBody = JSON.parse(body)
      } catch (e) {
        console.log('Expected json response for login', body)
        res.status(502).send('Unexpected response from server')
        return
      }

      if (statusCode >= 400) {
        res.send('Unable to log in')
        return
      }

      res.send(respBody.access_token)
    }
  )
})

const proxyRequest = ({url: urlParam, method = 'GET', reqBodyMapper = (req) => (req.body), useClientAuth = true}) => (req, res) => {
  const url = typeof urlParam === 'function' ? urlParam(req) : urlParam

  const auth = useClientAuth ? {
    'bearer': (req.header('Authorization') || '').substr('Bearer '.length)
  } : {
    username: API_HOST_USERNAME,
    password: API_HOST_PASSWORD
  }
  const body = reqBodyMapper(req)

  const reqStartTime = new Date().getTime()
  request(
    {
      url: `${API_HOST}${url}`,
      method,
      auth,
      json: true,
      body
    },
    (error, response, responseBody) => {
      const statusCode = (error && 502) || (response && response.statusCode) || 502
      res.status(statusCode)
      const reqEndTime = new Date().getTime()

      if (statusCode >= 400) {
        res.send(`Error: ${responseBody}`)
        console.warn(`${statusCode} ${method}: ${url} in ${reqEndTime - reqStartTime}ms`)
        return
      }
      if (!responseBody) {
        res.status(204)
      }
      res.send(responseBody)
    }
  )
}

app.post('/api/register', proxyRequest({
  url: '/api/v1/user/register',
  method: 'POST',
  useClientAuth: false,
  reqBodyMapper: (req) => {
    const {
      body: { first, last, email }
    } = req
    const host = req.get('host')
    const confirmUrl = `https://${host}/confirm?token=`

    return {
      firstName: first,
      lastName: last,
      email,
      clientUrl: confirmUrl
    }
  }
}))

app.post('/api/users/forgot-password', proxyRequest({
  url: '/api/v1/user/forgot-password',
  method: 'POST',
  useClientAuth: false,
  reqBodyMapper: (req) => {
    const {
      body: { email }
    } = req
    const host = req.get('host')
    const confirmUrl = `https://${host}/confirm?token=`

    return {
      userEmail: email,
      clientUrl: confirmUrl
    }
  }
}))

app.post('/api/users/confirm', proxyRequest({
  url: '/api/v1/user/confirm',
  method: 'POST',
  useClientAuth: false,
  reqBodyMapper: (req) => {
    const {
      body: {token, password}
    } = req

    return {
      nonce: token,
      password
    }
  }
}))

app.get('/api/seasons/:year/weeks/:week', proxyRequest({
  url: req => {
    const {
      params: { year, week }
    } = req
    return `/api/v1/games/season/${year}/week/${week}`
  }
}))

app.get('/api/seasons/:year/weeks/:week', proxyRequest({
  url: req => {
    const {
      params: { year, week }
    } = req
    return `/api/v1/games/season/${year}/week/${week}`
  }
}))

app.get('/api/pools', proxyRequest({
  url: '/api/v1/pool/list'
}))

app.get('/api/pools/:poolId/options', proxyRequest({
  url: req => {
    const {
      params: { poolId },
      query: {weekId = 1}
    } = req
    const seasonId = 2018
    return `/api/v1/picks/values?poolId=${poolId}&season=${seasonId}&week=${weekId}`
  }
}))

app.get('/api/picks', proxyRequest({
  url: req => {
    const {
      query: { poolId, weekId }
    } = req
    const seasonId = 2018
    return `/api/v1/picks/pool/${poolId}/season/${seasonId}/week/${weekId}`
  }
}))

app.post('/api/picks', proxyRequest({
  url: '/api/v1/picks',
  method: 'POST'
}))

app.get(['/api', '/api/*'], (req, res) => {
  res.status(404).send('Not implemented')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const server = app.listen(PORT)

console.log(`Running on port ${PORT}`)

const handleShutdown = () => {
  console.log('Shutting down...')
  server.close()
}

process.on('cleanup', handleShutdown)
process.on('exit', handleShutdown)

process.once('SIGUSR2', function () {
  handleShutdown()
  process.kill(process.pid, 'SIGUSR2')
})
