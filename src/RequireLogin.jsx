import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapState = ({ login: {status} }) => ({
  loggedIn: status === 'LOGGED_IN'
})

const RequireLogin = (props) => {
  const {inverted, loggedIn, children, redirect, redirectTo} = props
  if (loggedIn ^ inverted) {
    return children
  } else {
    return (redirect || redirectTo) ? <Redirect to={redirectTo || '/login'} /> : null
  }
}

export default connect(mapState)(RequireLogin)
