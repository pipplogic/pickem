import Typography from '@material-ui/core/Typography'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import React from 'react'

export default function DateTime ({ date, className }) {
  const weekday = format(date, 'ddd MMM D')
  const time = format(date, 'hh:mm A')

  return (
    <div className={className}>
      <Typography>{weekday}</Typography>
      <Typography>{time}</Typography>
    </div>
  )
}

DateTime.propTypes = {
  date: PropTypes.number.isRequired,
  className: PropTypes.string
}
