import { FormControl, Select, MenuItem } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

import { loadWeek } from "./api";
import { actionsForGames } from "./loadActions";

const yearOptions = [2016, 2017, 2018];
const weekOptions = [];
for (let i = 1; i <= 17; i += 1) {
  weekOptions.push(i);
}

class Selections extends Component {
  handleWeekChange(ev) {
    const { dispatch, week, picks } = this.props;
    const number = ev.target.value;

    dispatch({ type: "NEW_WEEK", number });
    loadWeek(week.year, number)
      .then(games => {
        actionsForGames(dispatch, picks, games);
      })
      .catch(() => {
        dispatch({ type: "WEEK_ERROR" });
      });
  }

  handleYearChange(ev) {
    const { dispatch, week, picks } = this.props;
    const year = ev.target.value;

    dispatch({ type: "NEW_YEAR", year });
    loadWeek(year, week.number)
      .then(games => {
        actionsForGames(dispatch, picks, games);
      })
      .catch(() => {
        dispatch({ type: "WEEK_ERROR" });
      });
  }

  render() {
    const { week, className } = this.props;

    return (
      <div className={className}>
        <FormControl>
          <Select value={week.year} onChange={ev => this.handleYearChange(ev)}>
            {yearOptions.map(yearOption => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={week.number}
            onChange={ev => this.handleWeekChange(ev)}
          >
            {weekOptions.map(weekOption => (
              <MenuItem key={weekOption} value={weekOption}>
                Week {weekOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

const mapState = function(state) {
  const { picks, week } = state;
  return { picks, week };
};

export default connect(mapState)(Selections);
