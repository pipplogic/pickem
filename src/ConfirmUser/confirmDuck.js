import { combineReducers } from 'redux'
import { confirmUser } from '../api'
import buildInputReducer from '../reducers/buildInputReducer'

const INPUT = 'pickem/confirm/input'
const SUBMIT = 'pickem/confirm/submit'
const SUCCESS = 'pickem/confirm/success'
const ERROR = 'pickem/confirm/error'
const SHOW_PASSWORD = 'pickem/confirm/showPassword'
const SET_TOKEN = 'pickem/confirm/token'

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
      return false
    default:
      return state
  }
}

const errorReducer = (state = null, action = {}) => {
  switch (action.type) {
    case INPUT:
    case SUBMIT:
      return null
    case ERROR:
      return action.error
    default:
      return state
  }
}

const showPasswordReducer = (state = false, action = {}) => {
  switch (action.type) {
    case SHOW_PASSWORD:
      return !state
    default:
      return state
  }
}

const tokenReducer = (state = '_UNSET_', action = {}) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token
    default:
      return state
  }
}

export default combineReducers({
  password: buildInputReducer(INPUT, 'password'),
  submitting: submittingReducer,
  success: successReducer,
  error: errorReducer,
  showPassword: showPasswordReducer,
  token: tokenReducer
})

export const getPassword = ({ password }) => password

export const getToken = ({ token }) => token

export const setToken = token => ({
  type: SET_TOKEN,
  token
})
export const handleInputChange = ev => ({
  type: INPUT,
  name: ev.target.name,
  value: ev.target.value
})

export const buildHandleSubmit = getConfirmState => ev => {
  ev.preventDefault()
  return (dispatch, getState) => {
    dispatch({ type: SUBMIT })
    const fullState = getState()
    const state = getConfirmState(fullState)
    const password = getPassword(state)
    const token = getToken(state)

    confirmUser({ token, password })
      .then(() => dispatch({ type: SUCCESS }))
      .catch(err => {
        const error = (err || {}).message || 'Error'

        dispatch({ type: ERROR, error })
      })
  }
}

export const buildActionCreators = getConfirmState => ({
  setToken,
  handleInputChange,
  handleSubmit: buildHandleSubmit(getConfirmState)
})
