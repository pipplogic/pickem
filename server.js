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

app.post('/api/register', (req, res) => {
  const {
    body: { first, last, email }
  } = req

  const host = req.get('host')
  const confirmUrl = `https://${host}/confirm?token=`

  const createUserBody = {
    firstName: first,
    lastName: last,
    email,
    clientUrl: confirmUrl
  }

  request(
    {
      url: `${API_HOST}/api/v1/user/register`,
      method: 'POST',
      auth: {
        username: API_HOST_USERNAME,
        password: API_HOST_PASSWORD
      },
      json: true,
      body: createUserBody
    },
    (error, response, body) => {
      const statusCode = (error && 502) || (response && response.statusCode) || 502
      res.status(statusCode)

      if (statusCode >= 400) {
        console.warn(`Unable to register: ${body}`)
        res.send(`Unable to register: ${body}`)
        return
      }
      if (!body) {
        res.status(204)
      }
      res.send(body)
    }
  )
})

app.post('/api/users/confirm', (req, res) => {
  const {
    body: {token, password}
  } = req

  const confirmUserBody = {
    nonce: token,
    password
  }

  request(
    {
      url: `${API_HOST}/api/v1/user/confirm`,
      method: 'POST',
      auth: {
        username: API_HOST_USERNAME,
        password: API_HOST_PASSWORD
      },
      json: true,
      body: confirmUserBody
    },
    (error, response, body) => {
      const statusCode = (error && 502) || (response && response.statusCode) || 502
      res.status(statusCode)

      if (statusCode >= 400) {
        console.warn(`Unable to confirm: ${body}`)
        res.send(`Unable to confirm: ${body}`)
        return
      }
      if (!body) {
        res.status(204)
      }
      res.send(body)
    }
  )
})

app.get('/api/seasons/:year/weeks/:week', (req, res) => {
  const {
    params: { year, week }
  } = req
  const clientAuth = req.header('Authorization')

  request(
    {
      url: `${API_HOST}/api/v1/games/season/${year}/week/${week}`,
      method: 'GET',
      headers: {
        Authorization: clientAuth
      }
    },
    (error, response, body) => {
      const statusCode = (error && 502) || (response && response.statusCode) || 502
      res.status(statusCode)

      let respBody
      try {
        respBody = JSON.parse(body)
      } catch (e) {
        console.log('Expected json response for week info', body)
        res.status(502).send('Unexpected response from server')
        return
      }

      if (statusCode !== 200) {
        res.send('Could not retreive week')
        return
      }

      res.send(respBody)
    }
  )
})

app.get(['/api', '/api/*'], (req, res) => {
  res.status(404).send('Not implemented')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)
console.log(`Running on port ${PORT}`)
