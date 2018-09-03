import Typography from '@material-ui/core/Typography'
import Autorenew from '@material-ui/icons/Autorenew'
import Error from '@material-ui/icons/Error'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const statusToIcon = {
  loading: Autorenew,
  error: Error
}

const statusToColor = {
  error: 'error'
}

const statusToSpin = {
  loading: true
}

const statusToText = {
  error: 'Error',
  loading: 'Loading'
}

export default function StatusPage ({
  classes,
  className,
  children,
  status,
  Icon = statusToIcon[status],
  iconColor = statusToColor[status] || 'primary',
  iconSpin = statusToSpin[status],
  text = statusToText[status]
}) {
  return (
    <div className={cx(className, classes.root)}>
      {Icon && (
        <Icon
          color={iconColor}
          classes={{ root: cx(classes.icon, { [classes.spin]: iconSpin }) }}
        />
      )}
      {children && <Typography variant='headline'>{children}</Typography>}
      {!children && text && <Typography variant='headline'>{text}</Typography>}
    </div>
  )
}

StatusPage.propTypes = {
  classes: PropTypes.shape({
    spin: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  // React.ComponentType
  Icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  iconColor: PropTypes.string,
  iconSpin: PropTypes.bool,
  status: PropTypes.oneOf(Object.keys(statusToIcon)),
  text: PropTypes.string,
  iconClassName: PropTypes.string
}
