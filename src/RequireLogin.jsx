import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getLoginState } from './reducers'
import { isInitialized, isLoggedIn } from './Login/loginDuck'

const mapState = state => ({
  initialized: isInitialized(getLoginState(state)),
  loggedIn: isLoggedIn(getLoginState(state))
})

const RequireLogin = ({
  inverted,
  initialized,
  loggedIn,
  children,
  redirect,
  redirectTo
}) => {
  if (!initialized) {
    return null
  }
  const shouldShow = (loggedIn && !inverted) || (!loggedIn && inverted)

  if (shouldShow) {
    return children
  } else {
    return redirect || redirectTo ? (
      <Redirect to={redirectTo || '/login'} />
    ) : null
  }
}

export default connect(mapState)(RequireLogin)
