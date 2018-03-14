import React, { Component } from 'react';
import './Game.css';
import Team from './Team';

class Game extends Component {

    render() {
        return (
            <div className="game">
                <Team team={this.props.awayTeam} />
                {' at '}
                <Team team={this.props.homeTeam} />
            </div>
        );
    }
}

export default Game;
