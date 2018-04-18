import React, { Component } from "react";

import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

const API_HOST = process.env.REACT_APP_API_HOST;

const formatDate = date =>
  new Date(date).toLocaleString("en-us", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit"
  });

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

  loadGames = () => {
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
  };

  handleWeekChange = ev => {
    let { store } = this.props;
    store.dispatch({ type: "NEW_WEEK", number: ev.target.value });
    this.loadGames();
  };

  handleYearChange = ev => {
    let { store } = this.props;
    store.dispatch({ type: "NEW_YEAR", year: ev.target.value });
    this.loadGames();
  };

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell numeric>Away</TableCell>
              <TableCell />
              <TableCell>Home</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {week.games.map(game => {
              return (
                <TableRow key={game.gameId}>
                  <TableCell>{formatDate(game.gameTime)}</TableCell>
                  <TableCell
                    numeric
                    style={{
                      backgroundColor:
                        picks[game.gameId] === game.awayTeam.teamId
                          ? "gold"
                          : ""
                    }}
                    onClick={() =>
                      store.dispatch({
                        type: "PICK",
                        gameId: game.gameId,
                        team: game.awayTeam.teamId
                      })}
                  >
                    {game.awayTeam.city} {game.awayTeam.teamName}
                  </TableCell>
                  <TableCell>&nbsp;@&nbsp;</TableCell>
                  <TableCell
                    style={{
                      backgroundColor:
                        picks[game.gameId] === game.homeTeam.teamId
                          ? "gold"
                          : ""
                    }}
                    onClick={() =>
                      store.dispatch({
                        type: "PICK",
                        gameId: game.gameId,
                        team: game.homeTeam.teamId
                      })}
                  >
                    {game.homeTeam.city} {game.homeTeam.teamName}
                  </TableCell>
                  <TableCell>10</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default App;
