import { loadToken } from '../api'
import { initializeToken } from '../Login/loginDuck'

export const mapDispatch = dispatch => ({
  loadExistingSession: () => {
    const token = loadToken()
    dispatch(initializeToken(token))
  }
})
