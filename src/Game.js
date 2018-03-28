import React, { Component } from "react";
import "./Game.css";
import Team from "./Team";
import PropTypes from "prop-types";

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      gameId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      homeTeam: PropTypes.object.isRequired,
      awayTeam: PropTypes.object.isRequired
    }),
    currentPick: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  handleClickHome = () => {
    let { store, game: { gameId }, homeTeam } = this.props;
    store.dispatch({ type: "PICK", gameId, team: homeTeam.teamId });
  };

  handleClickAway = () => {
    let { store, game: { gameId }, awayTeam } = this.props;
    store.dispatch({ type: "PICK", gameId, team: awayTeam.teamId });
  };

  render() {
    let { currentPick, game: { homeTeam, awayTeam } } = this.props;

    return (
      <div className="game">
        <Team
          team={awayTeam}
          onClick={this.handleClickAway}
          picked={currentPick === awayTeam.teamId}
        />
        {" at "}
        <Team
          team={homeTeam}
          onClick={this.handleClickHome}
          picked={currentPick === homeTeam.teamId}
        />
      </div>
    );
  }
}

export default Game;
