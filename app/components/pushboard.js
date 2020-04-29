import React from 'react';
import './pushboard.css';

import Letter from './letter.js'
import Board from './board.js'
import Factory from './factory.js'

class Pushboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {letters: []};
    this.addLetter = this.addLetter.bind(this);
  }

  addLetter(letter) {
    console.log(this.state.letters);
    this.setState(state => {
      return {letters: state.letters.concat(letter)};
    });
  }

  render() {
    return (
      <div id="pushboard" className="pushboard">
        <Board />
        <Factory addLetter={this.addLetter}/>
        {this.state.letters.map((letter) => <Letter value={letter} />)}
      </div>
    )
  }
}

export default Pushboard;
