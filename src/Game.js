import { Typography, withStyles } from "@material-ui/core";
import cx from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import DateTime from "./DateTime";
import PointPicker from "./PointPicker";
import Team from "./Team";

export const styles = theme => ({
  game: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1em 2fr 1fr",
    gridTemplateAreas: '"time away at home pts"',
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    time: {
      gridArea: "time"
    },
    away: {
      gridArea: "away"
    },
    at: {
      gridArea: "at"
    },
    home: {
      gridArea: "home"
    },
    pts: {
      gridArea: "pts"
    }
  },
  locked: {
    color: theme.palette.text.disabled
  },

  team: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class Game extends Component {
  select(gameId, teamId) {
    const { dispatch } = this.props;

    dispatch({
      type: "PICK",
      gameId,
      teamId
    });
  }

  render() {
    const { game, pick, gameIds, teams, availableScores, classes } = this.props;

    return (
      <div
        key={game.gameId}
        className={cx(classes.game, { [classes.locked]: pick.locked })}
      >
        <DateTime className={classes.time} date={game.gameTime} />
        <Team
          className={cx(classes.team, classes.away)}
          locked={pick.locked}
          selected={pick.teamId === game.awayTeam}
          team={teams.get(game.awayTeam)}
          onClick={() => this.select(game.gameId, game.awayTeam)}
        />
        <Typography color="inherit" className={classes.at}>
          @
        </Typography>
        <Team
          className={cx(classes.team, classes.home)}
          locked={pick.locked}
          selected={pick.teamId === game.homeTeam}
          team={teams.get(game.homeTeam)}
          onClick={() => this.select(game.gameId, game.homeTeam)}
        />
        <div className={classes.pts}>
          <PointPicker
            locked={pick.locked}
            options={availableScores}
            gameId={game.gameId}
            gameIds={gameIds}
            score={pick.score}
          />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.shape({
    gameId: PropTypes.number.isRequired,
    gameTime: PropTypes.string.isRequired,
    awayTeam: PropTypes.number.isRequired,
    homeTeam: PropTypes.number.isRequired
  }).isRequired,
  pick: PropTypes.shape({}).isRequired,
  teams: PropTypes.instanceOf(Map).isRequired,
  availableScores: PropTypes.arrayOf(PropTypes.number).isRequired,
  gameIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapState = state => {
  const { teams } = state;
  return { teams };
};

export default connect(mapState)(withStyles(styles)(Game));
