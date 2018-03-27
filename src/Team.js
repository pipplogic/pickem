import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Team.css";

class Team extends Component {
  static propTypes = {
    picked: PropTypes.bool,
    team: PropTypes.shape({
      city: PropTypes.string.isRequired,
      teamName: PropTypes.string.isRequired
    })
  };

  render() {
    let { team, picked, ...rest } = this.props;
    return (
      <div className={"team " + (picked ? "team-picked" : "")} {...rest}>
        {team.city} {team.teamName}
      </div>
    );
  }
}

export default Team;
