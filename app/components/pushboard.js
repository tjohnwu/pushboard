import React from 'react';
import './pushboard.css';

import Letter from './letter.js'
import Board from './board.js'
import Factory from './factory.js'

class Pushboard extends React.Component {
  render() {
    return (
      <div id="pushboard" className="pushboard">
        <Board />
        <Factory />
        <Letter value='Q'/>
      </div>
    )
  }
}

export default Pushboard;
