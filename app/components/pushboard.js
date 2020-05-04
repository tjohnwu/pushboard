import React from "react";
import "./pushboard.css";

import Letter from "./letter.js";
import Board from "./board.js";
import Factory from "./factory.js";

class Pushboard extends React.Component {
  constructor(props) {
    super(props);
    this.addLetter = this.addLetter.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
    this.deleteLetter = this.deleteLetter.bind(this);

    this.getKey = (() => {
      var counter = 0;
      return () => counter++;
    })();

    var letters = {};
    letters[this.getKey()] = "a";
    this.state = {
      letters: letters,
    };
  }

  addLetter(letter) {
    var key = this.getKey();
    var additionalLetter = {};
    additionalLetter[key] = letter;
    var newState = Object.assign({}, this.state.letters, additionalLetter);

    this.setState((state) => {
      return { letters: newState };
    });
  }

  clearLetters() {
    this.setState((state) => {
      return { letters: {} };
    });
  }

  deleteLetter(key) {
    var newLetters = Object.assign(this.state.letters);
    delete newLetters[key];
    this.setState((state) => {
      return { letters: newLetters };
    });
  }

  render() {
    return (
      <div id="pushboard" className="pushboard">
        <Board />
        <Factory addLetter={this.addLetter} clearLetters={this.clearLetters} />
        {Object.keys(this.state.letters).map((key) => (
          <Letter
            key={key}
            parentKey={key}
            value={this.state.letters[key]}
            deleteLetter={this.deleteLetter}
          />
        ))}
      </div>
    );
  }
}

export default Pushboard;
