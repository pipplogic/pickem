import { combineReducers } from 'redux'
import { forgotPasswordForUser } from '../api'
import buildInputReducer from '../reducers/buildInputReducer'

const INPUT = 'pickem/forgotPassword/input'
const SUBMIT = 'pickem/forgotPassword/submit'
const SUCCESS = 'pickem/forgotPassword/success'
const ERROR = 'pickem/forgotPassword/error'

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
  email: buildInputReducer(INPUT, 'email'),
  submitting: submittingReducer,
  success: successReducer,
  error: errorReducer
})

export const getInputs = ({ first, last, email }) => ({
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

    forgotPasswordForUser(inputValues)
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
