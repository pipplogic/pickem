import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Autorenew from '@material-ui/icons/Autorenew'
import MailOutline from '@material-ui/icons/MailOutline'
import Send from '@material-ui/icons/Send'
import PropTypes from 'prop-types'
import React from 'react'

import StatusPage from '../StatusPage'

export default function ForgotPassword ({
  classes,
  email,
  error,
  submitting,
  success,
  handleInputChange,
  handleSubmit
}) {
  if (success) {
    return (
      <StatusPage
        className={classes.root}
        Icon={MailOutline}
        text='Check your email'
      />
    )
  }
  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <Typography variant='subheading' align='center'>
        Forgot Password
      </Typography>

      <TextField
        type='email'
        label='Email'
        name='email'
        value={email}
        error={Boolean(error)}
        disabled={submitting}
        onChange={handleInputChange}
      />

      <Button
        type='submit'
        variant='raised'
        color='primary'
        disabled={submitting}
      >
        Request New Password
        {submitting && (
          <Autorenew className={`${classes.rightIcon} ${classes.load}`} />
        )}
        {!submitting && <Send className={classes.rightIcon} />}
      </Button>
    </form>
  )
}

ForgotPassword.propTypes = {
  classes: PropTypes.shape({
    load: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired
  }).isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
}
