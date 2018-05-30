import React, { Component } from "react";
import { connect } from "react-redux";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import PropTypes from "prop-types";

class PointPicker extends Component {
  handlePointChange(ev) {
    const { dispatch, gameId, gameIds } = this.props;
    const score = ev.target.value;
    dispatch({ type: "SCORE_MOVE", gameId, gameIds, score });
  }

  render() {
    const { options, score, locked } = this.props;

    const selectProps = {
      IconComponent: locked ? Lock : undefined,
      readOnly: locked
    };
    const displayOptions = locked ? [score] : options;

    return (
      <FormControl>
        <Select
          value={score || ""}
          onChange={ev => this.handlePointChange(ev)}
          {...selectProps}
        >
          {displayOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

PointPicker.defaultProps = {
  score: "",
  locked: false
};

PointPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  gameIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  score: PropTypes.number,
  locked: PropTypes.bool
};

export default connect()(PointPicker);
