import React, { Component } from "react";
import { connect } from "react-redux";

import { loadWeek } from "./api";
import DateTime from "./DateTime";
import Team from "./Team";
import "./Week.css";

class Week extends Component {
  componentDidMount() {
    this.loadGames();
  }

  loadGames = () => {
    const { dispatch, week } = this.props;

    loadWeek(week.year, week.number)
      .then(games => {
        dispatch({ type: "WEEK_LOADED", games });
      })
      .catch(err => {
        dispatch({ type: "WEEK_ERROR" });
      });
  };

  select = (gameId, teamId) => () => {
    const { dispatch } = this.props;

    dispatch({
      type: "PICK",
      gameId: gameId,
      team: teamId
    });
  };

  render() {
    const { week, picks } = this.props;

    if (!week.loaded) {
      return <h3>Loading...</h3>;
    }

    if (week.error) {
      return <h3>Error!</h3>;
    }

    return (
      <div className="week">
        <div className="game game-header clearfix">
          <span className="game-time">Time</span>
          <span className="game-away">Away</span>
          <span className="game-at">&nbsp;</span>
          <span className="game-home">Home</span>
          <span className="game-pts">Pts</span>
        </div>
        {week.games.map(game => {
          return (
            <div key={game.gameId} className="game clearfix">
              <span className="game-time">
                <DateTime date={game.gameTime} />
              </span>
              <div className="game-away">
                <Team
                  selected={picks[game.gameId] === game.awayTeam.teamId}
                  team={game.awayTeam}
                  onClick={this.select(game.gameId, game.awayTeam.teamId)}
                />
              </div>
              <span className="game-at">@</span>
              <div className="game-home">
                <Team
                  selected={picks[game.gameId] === game.homeTeam.teamId}
                  team={game.homeTeam}
                  onClick={this.select(game.gameId, game.homeTeam.teamId)}
                />
              </div>
              <span className="game-pts">10</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(state => state)(Week);
