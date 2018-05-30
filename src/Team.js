import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Team.css";

function Team({ selected, locked, team, ...rest }) {
  return (
    <div {...rest} className={cx("team", { selected, locked })}>
      <div className="team-location">{team.city}</div>
      <div className="team-name">{team.teamName}</div>
    </div>
  );
}

Team.defaultProps = {
  locked: false,
  selected: false
};

Team.propTypes = {
  selected: PropTypes.bool,
  locked: PropTypes.bool,
  team: PropTypes.shape({
    city: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired
  }).isRequired
};

export default Team;
