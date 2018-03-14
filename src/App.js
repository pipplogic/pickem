import React, { Component } from 'react';
import Game from './Game.js'

const games = [
  {
    awayTeam: {
      location: 'Philadelphia',
      mascot: 'Eagles'
    },
    homeTeam: {
      location: 'New England',
      mascot: 'Patriots'
    }
  }
]

class App extends Component {
  render() {
    return (
      <div  className="App">
        {games.map(game =>
          <Game homeTeam={games[0].homeTeam} awayTeam={games[0].awayTeam} />
        )}
      </div>
    );
  }
}

export default App;
