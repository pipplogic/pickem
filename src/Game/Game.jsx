import Typography from "@material-ui/core/Typography";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

import DateTime from "../DateTime";
import PointPicker from "../PointPicker";
import Team from "../Team";

export default function Game({ classes, className, game, locked, selectTeam }) {
  return (
    <div
      className={cx(className, classes.game, {
        [classes.locked]: locked
      })}
    >
      <DateTime className={classes.time} date={game.gameTime} />
      <Team
        gameId={game.gameId}
        className={classes.away}
        teamId={game.awayTeam}
        onClick={selectTeam(game.awayTeam)}
      />
      <Typography className={classes.at}>@</Typography>
      <Team
        gameId={game.gameId}
        className={classes.home}
        teamId={game.homeTeam}
        onClick={selectTeam(game.homeTeam)}
      />
      <div className={classes.pts}>
        <PointPicker gameId={game.gameId} />
      </div>
    </div>
  );
}

const idType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

Game.propTypes = {
  classes: PropTypes.shape({
    at: PropTypes.string.isRequired,
    away: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    home: PropTypes.string.isRequired,
    locked: PropTypes.string.isRequired,
    pts: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
  game: PropTypes.shape({
    awayTeam: idType.isRequired,
    gameId: idType.isRequired,
    gameTime: PropTypes.number.isRequired,
    homeTeam: idType.isRequired
  }).isRequired,
  locked: PropTypes.bool.isRequired,
  selectTeam: PropTypes.func.isRequired
};

Game.defaultProps = {
  className: ""
};
