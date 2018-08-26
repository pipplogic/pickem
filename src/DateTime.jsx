import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import cx from 'classnames'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import React from 'react'

function DateTime ({ date, classes, className }) {
  const weekday = format(date, 'ddd MMM D')
  const time = format(date, 'hh:mm A')

  return (
    <div className={cx(classes.root, className)}>
      <Typography className={classes.day}>{weekday}</Typography>
      <Typography>{time}</Typography>
    </div>
  )
}

DateTime.propTypes = {
  date: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    day: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  day: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit
    }
  }
})

export default withStyles(styles)(DateTime)
