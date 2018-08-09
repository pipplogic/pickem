import Typography from '@material-ui/core/Typography'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export default function WeekStatus ({ classes, className, info }) {
  return (
    <div className={cx(className, classes.root)}>
      <info.Icon
        color={info.color}
        classes={{ root: cx(classes.icon, classes[info.className]) }}
      />
      <Typography variant='headline'>{info.text}</Typography>
    </div>
  )
}

WeekStatus.propTypes = {
  classes: PropTypes.shape({
    load: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
  info: PropTypes.shape({
    className: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    // React.ComponentType
    Icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

WeekStatus.defaultProps = {
  className: ''
}
