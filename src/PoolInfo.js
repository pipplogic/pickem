import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { idType, requireStrings } from './propType'

import {
  getPools,
  getPoolInvites,
  getActivePool,
  selectPool,
  joinPool
} from './reducers'

const PoolInfo = props => {
  const { classes } = props
  return (
    <div className={classes.center}>
      <PoolInvites {...props} />
      <PoolSelect {...props} />
    </div>
  )
}
PoolInfo.propTypes = {
  classes: requireStrings('center')
}

const PoolInvites = ({ invites, joinPool }) => {
  if (invites.length === 0) {
    return null
  }
  return (
    <React.Fragment>
      <Typography>Pending Invites:</Typography>
      {invites.map(invite => (
        <Button
          key={invite.poolId}
          onClick={joinPool(invite.poolId)}
          variant='outlined'
          color='secondary'
        >
          {invite.poolName}
        </Button>
      ))}
    </React.Fragment>
  )
}

PoolInvites.propTypes = {
  invites: PropTypes.arrayOf(
    PropTypes.shape({
      poolId: idType.isRequired,
      poolName: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  joinPool: PropTypes.func.isRequired
}

const PoolSelect = ({ pools, poolId, selectPoolId }) => {
  if (pools.length === 0 || !poolId) {
    return <Typography>Not Enrolled in any pools</Typography>
  }
  return (
    <FormControl>
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
  )
}

PoolSelect.propTypes = {
  poolId: idType,
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
    flexDirection: 'column',
    alignItems: 'center'
  }
})
export const mapState = (state, props) => {
  const pools = getPools(state)
  const poolId = getActivePool(state)
  const invites = getPoolInvites(state)

  return { pools, poolId, invites }
}

export const mapDispatch = {
  selectPoolId: ev => selectPool(ev.target.value),
  joinPool: poolId => joinPool(poolId)
}

export default connect(mapState, mapDispatch)(withStyles(styles)(PoolInfo))
