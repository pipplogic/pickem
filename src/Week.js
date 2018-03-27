import Game from "./Game.js";
import React, { Component } from "react";

const API_HOST = process.env.REACT_APP_API_HOST;

class App extends Component {
  constructor() {
    super();

    this.years = ["2016", "2017"];

    this.weeks = [];
    for (let i = 1; i <= 17; i++) {
      this.weeks.push(i);
    }
  }

  componentDidMount() {
    this.loadGames();
  }

  loadGames() {
    let { store } = this.props;
    let { week } = store.getState();
    let url = `${API_HOST}/api/v1/games/season/${week.year}/week/${week.number}`;
    fetch(url)
      .then(res => res.json())
      .then(result => {
        if (result.games) {
          store.dispatch({ type: "WEEK_LOADED", games: result.games });
        } else {
          store.dispatch({ type: "WEEK_ERROR" });
        }
      });
  }

  handleWeekChange(ev) {
    let { store } = this.props;
    store.dispatch({ type: "NEW_WEEK", number: ev.target.value });
    this.loadGames();
  }

  handleYearChange(ev) {
    let { store } = this.props;
    store.dispatch({ type: "NEW_YEAR", number: ev.target.value });
    this.loadGames();
  }

  render() {
    let { store } = this.props;
    let { week, picks } = store.getState();

    return (
      <div className="week">
        <select value={week.year} onChange={this.handleYearChange}>
          {this.years.map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select value={week.number} onChange={this.handleWeekChange}>
          {this.weeks.map(weekNum => {
            return (
              <option key={weekNum} value={weekNum}>
                Week {weekNum}
              </option>
            );
          })}
        </select>
        {!week.loaded && <h3>Loading...</h3>}
        {week.error && <h3>An error occured</h3>}
        {week.games.map(game => (
          <Game
            game={game}
            currentPick={picks[game.gameId]}
            store={store}
            key={game.gameId}
          />
        ))}
      </div>
    );
  }
}

export default App;
