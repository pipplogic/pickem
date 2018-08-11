import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Autorenew from '@material-ui/icons/Autorenew'
import Send from '@material-ui/icons/Send'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export default function Login ({
  classes,
  error,
  handleInputChange,
  handleSubmit,
  pass,
  submitting,
  user
}) {
  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <Typography variant='subheading' align='center'>
        Login
      </Typography>
      <TextField
        label='Email'
        name='user'
        value={user}
        onChange={handleInputChange}
        disabled={submitting}
        error={error}
      />
      <TextField
        label='Password'
        type='password'
        name='pass'
        value={pass}
        onChange={handleInputChange}
        disabled={submitting}
        error={error}
      />
      <Button type='submit' variant='raised' color='primary' disabled={submitting}>
        Login
        {submitting && (
          <Autorenew className={cx(classes.rightIcon, classes.load)} />
        )}
        {!submitting && <Send className={classes.rightIcon} />}
      </Button>
    </form>
  )
}

Login.propTypes = {
  classes: PropTypes.shape({
    load: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired
  }).isRequired,
  submitting: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  pass: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
