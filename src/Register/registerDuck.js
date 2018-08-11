import { combineReducers } from 'redux'
import { registerUser } from '../api'
import buildInputReducer from '../reducers/buildInputReducer'

const INPUT = 'pickem/register/input'
const SUBMIT = 'pickem/register/submit'
const SUCCESS = 'pickem/register/success'
const ERROR = 'pickem/register/error'

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

export default combineReducers({
  first: buildInputReducer(INPUT, 'first'),
  last: buildInputReducer(INPUT, 'last'),
  email: buildInputReducer(INPUT, 'email'),
  submitting: submittingReducer,
  success: successReducer,
  error: errorReducer
})

export const getInputs = ({ first, last, email }) => ({
  first,
  last,
  email
})

export const handleInputChange = ev => ({
  type: INPUT,
  name: ev.target.name,
  value: ev.target.value
})

export const buildHandleSubmit = getRegisterState => ev => {
  ev.preventDefault()
  return (dispatch, getState) => {
    dispatch({ type: SUBMIT })
    const fullState = getState()
    const state = getRegisterState(fullState)
    const inputValues = getInputs(state)

    registerUser(inputValues)
      .then(() => dispatch({ type: SUCCESS }))
      .catch(err => {
        const error = (err || {}).message

        dispatch({ type: ERROR, error })
      })
  }
}

export const buildActionCreators = getRegisterState => ({
  handleInputChange,
  handleSubmit: buildHandleSubmit(getRegisterState)
})
