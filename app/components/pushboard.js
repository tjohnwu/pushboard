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
    this.clearLetters = this.clearLetters.bind(this);
  }

  addLetter(letter) {
    this.setState(state => {
      return {letters: state.letters.concat(letter)};
    });
  }

  clearLetters() {
    this.setState(state => {
      return {letters: []};
    })
  }

  render() {
    return (
      <div id="pushboard" className="pushboard">
        <Board />
        <Factory addLetter={this.addLetter} clearLetters={this.clearLetters}/>
        {this.state.letters.map((key, letter) => <Letter value={letter} />)}
      </div>
    )
  }
}

export default Pushboard;
