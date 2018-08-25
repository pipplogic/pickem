import PropTypes from 'prop-types'

export default (...propNames) =>
  PropTypes.shape(
    propNames.reduce(
      (propType, className) => ({
        ...propType,
        [className]: PropTypes.string.isRequired
      }),
      {}
    )
  ).isRequired
