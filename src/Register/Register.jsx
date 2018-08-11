import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Autorenew from '@material-ui/icons/Autorenew'
import Error from '@material-ui/icons/Error'
import Send from '@material-ui/icons/Send'
import PropTypes from 'prop-types'
import React from 'react'

export default function Register ({
  classes,
  first,
  last,
  email,
  error,
  submitting,
  success,
  handleInputChange,
  handleSubmit
}) {
  if (success) {
    return (
      <div className={classes.root}>
        <Typography variant='heading'>Check your email!</Typography>
      </div>
    )
  }
  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <Typography variant='subheading' align='center'>
        Register
      </Typography>
      <TextField
        label='First Name'
        name='first'
        value={first}
        error={Boolean(error)}
        onChange={handleInputChange}
      />
      <TextField
        label='Last Name'
        name='last'
        value={last}
        error={Boolean(error)}
        disabled={submitting}
        onChange={handleInputChange}
      />
      <TextField
        type='email'
        label='Email'
        name='email'
        value={email}
        error={Boolean(error)}
        disabled={submitting}
        onChange={handleInputChange}
      />

      <Button type='submit' variant='raised' color='primary' disabled={submitting}>
        Register
        {submitting && (
          <Autorenew className={`${classes.rightIcon} ${classes.load}`} />
        )}
        {!submitting && <Send className={classes.rightIcon} />}
      </Button>
    </form>
  )
}

Register.propTypes = {
  classes: PropTypes.shape({
    load: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired
  }).isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.string,
  first: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  last: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
}
