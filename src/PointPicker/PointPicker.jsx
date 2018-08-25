import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Lock from '@material-ui/icons/Lock'
import PropTypes from 'prop-types'
import React from 'react'
import { idType } from '../propType'

function PointPicker ({
  className,
  score,
  options,
  locked,
  poolId,
  handleScoreChangeForPool,
  gameId
}) {
  return (
    <FormControl className={className}>
      <Select
        value={score}
        onChange={handleScoreChangeForPool({ poolId, gameId })}
        IconComponent={locked ? Lock : undefined}
        disabled={locked}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

PointPicker.propTypes = {
  className: PropTypes.string,
  gameId: idType.isRequired,
  handleScoreChangeForPool: PropTypes.func.isRequired,
  locked: PropTypes.bool.isRequired,
  poolId: idType.isRequired,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default PointPicker
