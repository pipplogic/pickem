import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import DateTime from "./DateTime";
import Team from "./Team";

import PointPicker from "./PointPicker";

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
    const { game, pick, gameIds, teams, availableScores } = this.props;

    return (
      <div key={game.gameId} className="game">
        <span className="game-time">
          <DateTime date={game.gameTime} />
        </span>
        <div className="game-away">
          <Team
            locked={pick.locked}
            selected={pick.teamId === game.awayTeam}
            team={teams.get(game.awayTeam)}
            onClick={() => this.select(game.gameId, game.awayTeam)}
          />
        </div>
        <span className="game-at">@</span>
        <div className="game-home">
          <Team
            locked={pick.locked}
            selected={pick.teamId === game.homeTeam}
            team={teams.get(game.homeTeam)}
            onClick={() => this.select(game.gameId, game.homeTeam)}
          />
        </div>
        <span className="game-pts">
          <PointPicker
            locked={pick.locked}
            options={availableScores}
            gameId={game.gameId}
            gameIds={gameIds}
            score={pick.score}
          />
        </span>
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

export default connect(mapState)(Game);
