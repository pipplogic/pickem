import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAvailableScores } from "./scoreUtils";
import { loadGames } from "./loadActions";
import Game from "./Game";
import GameHeader from "./GameHeader";

class Week extends Component {
  componentDidMount() {
    const { dispatch, picks, week } = this.props;

    loadGames(dispatch, picks, week);
  }

  select() {
    return (gameId, teamId) => {
      const { dispatch } = this.props;

      dispatch({
        type: "PICK",
        gameId,
        teamId
      });
    };
  }

  render() {
    const { week, picks } = this.props;

    if (!week.loaded) {
      return <h3>Loading...</h3>;
    }

    if (week.error) {
      return <h3>Error!</h3>;
    }

    const gameIds = [...week.games.keys()];
    const availableScores = getAvailableScores(gameIds, picks);
    return (
      <div className="week">
        <GameHeader />
        {gameIds.map(gameId => {
          const pick = picks.get(gameId) || {};
          const game = week.games.get(gameId) || {};

          return (
            <Game
              key={gameId}
              game={game}
              pick={pick}
              gameIds={gameIds}
              availableScores={availableScores}
            />
          );
        })}
      </div>
    );
  }
}

Week.propTypes = {
  dispatch: PropTypes.func.isRequired,
  picks: PropTypes.instanceOf(Map).isRequired,
  week: PropTypes.shape({
    games: PropTypes.instanceOf(Map).isRequired,
    loaded: PropTypes.bool,
    error: PropTypes.bool
  }).isRequired
};

const mapState = state => {
  const { picks, week } = state;
  return { picks, week };
};

export default connect(mapState)(Week);
