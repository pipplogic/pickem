import Typography from '@material-ui/core/Typography'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import DateTime from '../DateTime'
import Team from '../Team'
import { idType, requireStrings } from '../propType'
import PointPicker from '../PointPicker'

export default function Game ({ classes, game, poolId, locked, selectTeam }) {
  return (
    <div
      className={cx(classes.game, {
        [classes.locked]: locked
      })}
    >
      <DateTime className={classes.time} date={game.gameTime} />
      <Team
        gameId={game.gameId}
        className={classes.away}
        teamId={game.awayTeam}
        onClick={selectTeam({
          gameId: game.gameId,
          poolId,
          teamId: game.awayTeam
        })}
      />
      <Typography className={classes.at}>@</Typography>
      <Team
        gameId={game.gameId}
        className={classes.home}
        teamId={game.homeTeam}
        onClick={selectTeam({
          gameId: game.gameId,
          poolId,
          teamId: game.homeTeam
        })}
      />
      <div className={classes.pts}>
        <PointPicker gameId={game.gameId} />
      </div>
    </div>
  )
}

Game.propTypes = {
  classes: requireStrings(
    'at',
    'away',
    'game',
    'home',
    'locked',
    'pts',
    'time'
  ),
  game: PropTypes.shape({
    awayTeam: idType.isRequired,
    gameId: idType.isRequired,
    gameTime: PropTypes.number.isRequired,
    homeTeam: idType.isRequired
  }).isRequired,
  locked: PropTypes.bool.isRequired,
  poolId: idType.isRequired,
  selectTeam: PropTypes.func.isRequired
}
