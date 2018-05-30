import { FormControl, Select, MenuItem } from "@material-ui/core";
import cx from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { loadWeek } from "./api";
import { actionsForGames } from "./loadActions";

const years = [2016, 2017, 2018];
const weeks = [];
for (let i = 1; i <= 17; i += 1) {
  weeks.push(i);
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
      <div className={cx(className)}>
        <FormControl>
          <Select value={week.year} onChange={ev => this.handleYearChange(ev)}>
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={week.number}
            onChange={ev => this.handleWeekChange(ev)}
          >
            {weeks.map(weekNum => (
              <MenuItem key={weekNum} value={weekNum}>
                Week {weekNum}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

Selections.propTypes = {
  dispatch: PropTypes.func.isRequired,
  picks: PropTypes.instanceOf(Map).isRequired,
  week: PropTypes.shape({
    year: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired
  }).isRequired
};

export default connect(state => {
  const { picks, week } = state;
  return { picks, week };
})(Selections);
