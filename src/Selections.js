import React, { Component } from "react";
import { loadWeek } from "./api";
import { FormControl, NativeSelect, withStyles } from "@material-ui/core";

const years = ["2016", "2017", "2018"];
let weeks = [];
for (let i = 1; i <= 17; i++) {
  weeks.push(i);
}

class Selections extends Component {
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
    let { store, classes } = this.props;
    let { week } = store.getState();

    return (
      <div className={classes.center}>
        <FormControl>
          <NativeSelect value={week.year} onChange={this.handleYearChange}>
            {years.map(year => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl>
          <NativeSelect value={week.number} onChange={this.handleWeekChange}>
            {weeks.map(weekNum => {
              return (
                <option key={weekNum} value={weekNum}>
                  Week {weekNum}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

const styles = {
  center: {
    display: "flex",
    "justify-content": "center"
  }
};

export default withStyles(styles)(Selections);
