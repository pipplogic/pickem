import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { requireStrings } from './propType'
import {
  getWeekState,
  isGameLocked,
  getPickTeamId,
  getActivePool
} from './reducers'
import { getTeamById } from './Week/weekDuck'

const styles = theme => ({
  btn: {
    [theme.breakpoints.up('sm')]: {
      margin: `0 ${theme.spacing.unit}px`
    }
  }
})

function Team ({ classes, className, team, onClick, selected, locked }) {
  return (
    <Button
      className={className}
      classes={{ root: classes.btn }}
      disabled={locked}
      onClick={onClick}
      variant={selected ? 'raised' : 'flat'}
      color={selected ? 'primary' : 'default'}
    >
      <Typography>{team.city} {team.teamName}</Typography>
    </Button>
  )
}
Team.propTypes = {
  classes: requireStrings('btn'),
  className: PropTypes.string,
  team: PropTypes.shape({
    city: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  locked: PropTypes.bool
}

Team.defaultProps = {
  onClick: () => {}
}

const mapState = (state, { gameId, teamId }) => {
  const weekState = getWeekState(state)

  const team = getTeamById(weekState)(teamId)

  const poolId = getActivePool(state)
  const selected = getPickTeamId(state)(poolId)(gameId) === teamId
  const locked = isGameLocked(state)(gameId)

  return { team, selected, locked }
}

export default connect(mapState)(withStyles(styles)(Team))
