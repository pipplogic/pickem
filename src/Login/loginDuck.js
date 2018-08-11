import { combineReducers } from 'redux'

import { login } from '../api'
import buildInputReducer from '../reducers/buildInputReducer'

const INPUT = 'pickem/login/input'
const SUBMIT = 'pickem/login/submit'
const SUCCESS = 'pickem/login/success'
const ERROR = 'pickem/login/error'
const INVALID_AUTH = 'pickem/login/invalidAuth'

const initializedReducer = (state = false, action = {}) => {
  switch (action.type) {
    case SUCCESS:
    case ERROR:
    case INVALID_AUTH:
      return true
    default:
      return state
  }
}

const submittingReducer = (state = false, action = {}) => {
  switch (action.type) {
    case SUBMIT:
      return true
    case SUCCESS:
    case ERROR:
      return false
    default:
      return state
  }
}

const successReducer = (state = false, action = {}) => {
  switch (action.type) {
    case SUCCESS:
      return true
    case ERROR:
    case SUBMIT:
    case INVALID_AUTH:
      return false
    default:
      return state
  }
}

const errorReducer = (state = false, action = {}) => {
  console.log('action', action)
  switch (action.type) {
    case INPUT:
    case SUBMIT:
      return false
    case ERROR:
      return true
    default:
      return state
  }
}

export default combineReducers({
  user: buildInputReducer(INPUT, 'user'),
  pass: buildInputReducer(INPUT, 'pass'),
  submitting: submittingReducer,
  success: successReducer,
  error: errorReducer,
  initialized: initializedReducer
})

export const getInputs = ({ user, pass }) => ({
  user,
  pass
})

export const isLoggedIn = state => state.success
export const isInitialized = state => state.initialized

export const initializeToken = token => {
  if (token) {
    return { type: SUCCESS }
  }
  return { type: INVALID_AUTH, payload: 'Missing Token' }
}

export const setInvalidAuth = err => {
  return { type: INVALID_AUTH, payload: err }
}

export const handleInputChange = ev => ({
  type: INPUT,
  name: ev.target.name,
  value: ev.target.value
})

export const buildHandleSubmit = getLoginState => ev => {
  ev.preventDefault()
  return (dispatch, getState) => {
    dispatch({ type: SUBMIT })
    const fullState = getState()
    const state = getLoginState(fullState)
    const inputValues = getInputs(state)

    login(inputValues)
      .then(() => {
        dispatch({ type: SUCCESS })
        dispatch({
          type: INPUT,
          name: 'pass',
          value: ''
        })
      })
      .catch(err => {
        const error = (err || {}).message || 'Unable to login'

        dispatch({ type: ERROR, error })
      })
  }
}

export const buildActionCreators = getRegisterState => ({
  handleInputChange,
  handleSubmit: buildHandleSubmit(getRegisterState)
})
