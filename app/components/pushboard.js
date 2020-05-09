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
    this.state = {
      letters: letters,
    };
  }

  addLetters(sentence) {
    var additionalLetters = {};
    var characters = sentence.replace(/\s/g, "").split("");
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

    this.getKey = (() => {
      var counter = 0;
      return () => counter++;
    })();
  }

  deleteLetter(key) {
    var newLetters = Object.assign(this.state.letters);
    delete newLetters[key];
    this.setState((state) => {
      return { letters: newLetters };
    });
  }

  render() {
    var maxCharactersHorizontal =
      Math.floor(
        this.props.size.board_width / this.props.size.letter_font_size
      ) - 1;
    var maxCharactersVertical =
      Math.floor(
        this.props.size.board_height / this.props.size.letter_font_size
      ) - 1;
    return (
      <div className="pushboard">
        <Board
          width={this.props.size.board_width}
          height={this.props.size.board_height}
        />
        <Factory
          addLetters={this.addLetters}
          clearLetters={this.clearLetters}
        />
        {Object.keys(this.state.letters).map((key) => (
          <Letter
            key={key}
            parentKey={key}
            value={this.state.letters[key]}
            deleteLetter={this.deleteLetter}
            fontsize={this.props.size.letter_font_size}
            startingX={
              ((key % maxCharactersHorizontal) + 1) *
              this.props.size.letter_font_size
            }
            startingY={
              ((Math.floor(key / maxCharactersHorizontal) %
                maxCharactersVertical) +
                1) *
              this.props.size.letter_font_size
            }
          />
        ))}
      </div>
    );
  }
}

Pushboard.Size = {
  DEFAULT: { board_width: 400, board_height: 600, letter_font_size: 50 },
};

Pushboard.defaultProps = {
  size: Pushboard.Size.DEFAULT,
};

export default Pushboard;
