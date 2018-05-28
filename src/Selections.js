import React, { Component } from "react";
import { connect } from "react-redux";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { loadWeek } from "./api";

const years = [2016, 2017, 2018];
let weeks = [];
for (let i = 1; i <= 17; i++) {
  weeks.push(i);
}

class Selections extends Component {
  loadGames = (year, number) => {
    const { dispatch } = this.props;

    loadWeek(year, number)
      .then(games => {
        dispatch({ type: "WEEK_LOADED", games });
      })
      .catch(err => {
        dispatch({ type: "WEEK_ERROR" });
      });
  };

  handleWeekChange = ev => {
    const { dispatch, week } = this.props;
    const number = ev.target.value;

    dispatch({ type: "NEW_WEEK", number });
    this.loadGames(week.year, number);
  };

  handleYearChange = ev => {
    const { dispatch, week } = this.props;
    const year = ev.target.value;

    dispatch({ type: "NEW_YEAR", year });
    this.loadGames(year, week.number);
  };

  render() {
    const { dispatch, week, ...rest } = this.props;

    return (
      <div {...rest}>
        <FormControl>
          <Select value={week.year} onChange={this.handleYearChange}>
            {years.map(year => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <Select value={week.number} onChange={this.handleWeekChange}>
            {weeks.map(weekNum => {
              return (
                <MenuItem key={weekNum} value={weekNum}>
                  Week {weekNum}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default connect(state => {
  const { week } = state;
  return { week };
})(Selections);
