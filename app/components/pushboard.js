import React from 'react';
import './pushboard.css';

import Letter from './letter.js'
import Board from './board.js'
import Factory from './factory.js'

class Pushboard extends React.Component {
  render() {
    return (
      <div className="pushboard">
        <Board />
        <Factory />
        <Letter />
      </div>
    )
  }
}

export default Pushboard;
