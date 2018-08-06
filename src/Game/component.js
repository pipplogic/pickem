import Typography from "@material-ui/core/Typography";
import cx from "classnames";
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
