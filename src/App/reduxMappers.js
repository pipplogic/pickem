import { loadToken } from '../api'
import { initializeToken } from '../Login/loginDuck'
import { loadPools } from '../reducers/pools'

export const mapDispatch = dispatch => ({
  loadExistingSession: () => {
    const token = loadToken()
    dispatch(initializeToken(token))
    if (token) {
      // TODO find a different place to load these?
      loadPools()(dispatch)
    }
  }
})
