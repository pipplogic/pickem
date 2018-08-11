import { loadToken } from '../api'
import { initializeToken } from '../reducers/login'

export const mapDispatch = dispatch => ({
  loadExistingSession: () => {
    const token = loadToken()
    dispatch(initializeToken(token))
  }
})
