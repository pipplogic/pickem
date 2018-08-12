import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Autorenew from '@material-ui/icons/Autorenew'
import Send from '@material-ui/icons/Send'
import PropTypes from 'prop-types'
import queryString from 'qs'
import React from 'react'
import {Redirect} from 'react-router-dom'

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    const {history, location, setToken} = this.props

    const {token} = queryString.parse(location.search)
    if (!token) {
      return history.push('/login')
    }
    setToken(token)
  }

  render () {
    const {
      classes,
      password,
      error,
      handleInputChange,
      handleSubmit,
      showPassword,
      submitting,
      success
    } = this.props

    if (success) {
      // TODO display some confirm action
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <Typography variant='subheading' align='center'>
        Set up password
        </Typography>
        <TextField
          label='Password'
          name='password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          error={Boolean(error)}
          onChange={handleInputChange}
        />

        <Button type='submit' variant='raised' color='primary' disabled={submitting}>
        Set Password
          {submitting && (
            <Autorenew className={`${classes.rightIcon} ${classes.load}`} />
          )}
          {!submitting && <Send className={classes.rightIcon} />}
        </Button>
      </form>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.shape({
    load: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired
  }).isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({push: PropTypes.func.isRequired}).isRequired,
  location: PropTypes.shape({search: PropTypes.string.isRequired}).isRequired,
  setToken: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
}
