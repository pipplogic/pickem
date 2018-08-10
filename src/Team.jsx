import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

const styles = theme => ({
  btn: {
    [theme.breakpoints.up('sm')]: {
      margin: `0 ${theme.spacing.unit}px`
    }
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  location: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit
    }
  }
})

function Team ({ classes, className, team, onClick, selected, locked }) {
  return (
    <Button
      className={className}
      classes={{ root: classes.btn, label: classes.team }}
      disabled={locked}
      onClick={onClick}
      variant={selected ? 'raised' : 'flat'}
      color={selected ? 'primary' : 'default'}
    >
      <Typography className={classes.location}>{team.city}</Typography>
      <Typography>{team.teamName}</Typography>
    </Button>
  )
}

const classesProp = (...classNames) =>
  PropTypes.shape(
    classNames.reduce(
      (propType, className) => ({
        ...propType,
        [className]: PropTypes.string.isRequired
      }),
      {}
    )
  ).isRequired

Team.propTypes = {
  classes: classesProp('btn', 'team', 'location'),
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
  // onClick: () => {}
}

const mapState = ({ picks, teams }, { gameId, teamId }) => {
  const team = teams.get(teamId)
  const { locked, teamId: pickedTeam } = picks.get(gameId)
  const selected = pickedTeam === teamId

  return { team, selected, locked }
}

export default connect(mapState)(withStyles(styles)(Team))
