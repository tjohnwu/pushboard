import React from "react";
import "./pushboard.css";

import Letter from "./letter.js";
import Board from "./board.js";
import Factory from "./factory.js";

class Pushboard extends React.Component {
  constructor(props) {
    super(props);
    this.addLetters = this.addLetters.bind(this);
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

  addLetters(sentence) {
    var additionalLetters = {};
    var characters = sentence.replace(/\s/g, '').split('');
    characters.forEach((element, i) => {
      var key = this.getKey();
      additionalLetters[key] = element;
    });

    var newState = Object.assign({}, this.state.letters, additionalLetters);
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
        <Factory addLetters={this.addLetters} clearLetters={this.clearLetters} />
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
