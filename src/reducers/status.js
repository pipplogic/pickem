export const STATUS = 'pickem/status/add'
const CLEAR = 'pickem/status/clear'

export default (state = null, action = {}) => {
  switch (action.type) {
    case STATUS: {
      return {
        level: action.payload.level || 'info',
        message: action.payload.message || action.payload
      }
    }
    case CLEAR: {
      return null
    }
    default: {
      return state
    }
  }
}

export const addError = message => ({
  type: STATUS,
  payload: {
    level: 'error',
    message
  }
})
