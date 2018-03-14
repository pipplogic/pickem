import React, { Component } from 'react';
import './Team.css';


class Team extends Component {

    render() {
        return (
            <div className="team">
                {this.props.team.location} {' '} {this.props.team.mascot}
            </div>
        );
    }
}

export default Team;
