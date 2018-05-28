import React, { Component } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  withStyles
} from "@material-ui/core";

import { loadWeek } from "./api";

const mobile = "@media (max-width: 767px)";

const DateTime = withStyles({
  [mobile]: {
    part: {
      display: "block"
    }
  }
})(function DateTime({ date, classes }) {
  const dateObj = new Date(date);
  const weekday = dateObj.toLocaleString("en-us", {
    weekday: "short"
  });
  const time = dateObj.toLocaleString("en-us", {
    hour: "numeric",
    minute: "2-digit"
  });

  return [
    <span key="date" className={classes.part}>
      {weekday}
    </span>,
    <span key="time" className={classes.part}>
      {time}
    </span>
  ];
});

const CustomTableCell = withStyles(theme => ({
  root: {
    backgroundColor: "#ffc",
    textAlign: "center",
    padding: "4px 40px",
    [mobile]: {
      padding: 0,
      backgroundColor: "#fcf"
    }
  }
}))(TableCell);

class Week extends Component {
  componentDidMount() {
    this.loadGames();
  }

  loadGames = () => {
    let { store } = this.props;
    let { week } = store.getState();

    loadWeek(week.year, week.number)
      .then(games => {
        store.dispatch({ type: "WEEK_LOADED", games });
      })
      .catch(err => {
        store.dispatch({ type: "WEEK_ERROR" });
      });
  };

  render() {
    let { store, classes } = this.props;
    let { week, picks } = store.getState();

    return (
      <div className="week">
        {!week.loaded && <h3>Loading...</h3>}
        {week.error && <h3>An error occured</h3>}
        {week.loaded &&
          !week.error && (
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell classes={{ root: classes["col-time"] }}>
                    Time
                  </CustomTableCell>
                  <CustomTableCell
                    numeric
                    classes={{ root: classes["col-team-away"] }}
                  >
                    Away
                  </CustomTableCell>
                  <CustomTableCell classes={{ root: classes["col-at"] }} />
                  <CustomTableCell classes={{ root: classes["col-team-home"] }}>
                    Home
                  </CustomTableCell>
                  <CustomTableCell classes={{ root: classes["col-pts"] }}>
                    Pts
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {week.games.map(game => {
                  return (
                    <TableRow key={game.gameId}>
                      <CustomTableCell classes={{ root: classes["col-time"] }}>
                        <DateTime date={game.gameTime} />
                      </CustomTableCell>
                      <CustomTableCell
                        classes={{ root: classes["col-team-away"] }}
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
                        <span className={classes.teamCity}>
                          {game.awayTeam.city}
                        </span>
                        <span className={classes.teamName}>
                          {game.awayTeam.teamName}
                        </span>
                      </CustomTableCell>
                      <CustomTableCell classes={{ root: classes["col-at"] }}>
                        @
                      </CustomTableCell>
                      <CustomTableCell
                        classes={{ root: classes["col-team-home"] }}
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
                        <span className={classes.teamCity}>
                          {game.homeTeam.city}
                        </span>
                        <span className={classes.teamName}>
                          {game.homeTeam.teamName}
                        </span>{" "}
                      </CustomTableCell>
                      <CustomTableCell classes={{ root: classes["col-pts"] }}>
                        10
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
      </div>
    );
  }
}

const styles = {
  teamCity: {
    marginRight: "1ch",
    [mobile]: {
      marginRight: "none",
      display: "block"
    }
  },
  teamName: {
    [mobile]: {
      display: "block"
    }
  },
  "col-time": {},
  "col-team-away": {},
  "col-at": {
    [mobile]: {
      backgroundColor: "red",
      display: "none"
    }
  },
  "col-team-home": {},
  "col-pts": {}
};

export default withStyles(styles)(Week);
