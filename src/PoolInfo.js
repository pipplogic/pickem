import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { idType, requireStrings } from './propType'

import { getPools, getActivePool, selectPool } from './reducers'

export const PoolInfo = ({ classes, pools, poolId, selectPoolId }) => {
  if (pools.length === 0 || !poolId) {
    return <Typography className={classes.center}>
    Not Enrolled in any pools
    </Typography>
  }
  return (
    <div className={classes.center}>
      <FormControl >
        <InputLabel htmlFor='select-pool'>Pool</InputLabel>
        <Select
          autoWidth
          value={poolId}
          inputProps={{
            name: 'pool',
            id: 'select-pool'
          }}
          onChange={selectPoolId}
        >
          {pools.map(pool => (
            <MenuItem key={pool.poolId} value={pool.poolId}>
              {pool.poolName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

PoolInfo.propTypes = {
  poolId: idType,
  classes: requireStrings('center'),
  pools: PropTypes.arrayOf(
    PropTypes.shape({
      poolId: idType.isRequired,
      poolName: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectPoolId: PropTypes.func.isRequired
}

export const styles = theme => ({
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
})
export const mapState = (state, props) => {
  const pools = getPools(state)
  const poolId = getActivePool(state)

  return { pools, poolId }
}

export const mapDispatch = dispatch => ({
  selectPoolId: ev => dispatch(selectPool(ev.target.value))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(PoolInfo))
