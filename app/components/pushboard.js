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
      boardOffsetLeft: 0,
      boardOffsetTop: 0,
      boardWidth: 0,
      boardHeight: 0,
    };

    this.boardRef = React.createRef();
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
      return {
        letters: newState,
      };
    });
  }

  clearLetters() {
    this.setState((state) => {
      return {
        letters: {},
      };
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
      return {
        letters: newLetters,
      };
    });
  }

  componentDidMount() {
    this.setState((state) => {
      return {
        boardOffsetLeft: this.boardRef.current.offsetLeft,
        boardOffsetTop: this.boardRef.current.offsetTop,
        boardHeight: this.boardRef.current.clientHeight,
        boardWidth: this.boardRef.current.clientWidth,
      };
    });
  }

  render() {
    const maxCharactersHorizontal =
      Math.floor(
        this.state.boardWidth / this.props.letter_font_size
      ) - 1;
    const maxCharactersVertical =
      Math.floor(
        this.state.boardHeight / this.props.letter_font_size
      ) - 1;

    const minLetterOffsetLeft = this.state.boardOffsetLeft;
    const maxLetterOffsetLeft = minLetterOffsetLeft + this.state.boardWidth;
    const minLetterOffsetTop = this.state.boardOffsetTop;
    const maxLetterOffsetTop = minLetterOffsetTop + this.state.boardHeight;

    var style = {};
    if (this.props.board_height) {
      style["height"] = this.props.board_height;
    }

    if (this.props.board_width) {
      style["width"] = this.props.board_width;
    }

    return (
      <div className="pushboard" style={style}>
        <Factory
          addLetters={this.addLetters}
          clearLetters={this.clearLetters}
        />
        <Board ref={this.boardRef}/>
        {Object.keys(this.state.letters).map((key) => (
          <Letter
            key={key}
            minLetterOffsetLeft={minLetterOffsetLeft}
            minLetterOffsetTop={minLetterOffsetTop}
            maxLetterOffsetLeft={maxLetterOffsetLeft}
            maxLetterOffsetTop={maxLetterOffsetTop}
            parentKey={key}
            value={this.state.letters[key]}
            deleteLetter={this.deleteLetter}
            fontsize={this.props.letter_font_size}
            startingX={
              ((key % maxCharactersHorizontal) + 1) *
                this.props.letter_font_size +
              this.state.boardOffsetLeft
            }
            startingY={
              ((Math.floor(key / maxCharactersHorizontal) %
                maxCharactersVertical) +
                1) *
                this.props.letter_font_size +
              this.state.boardOffsetTop
            }
          />
        ))}
      </div>
    );
  }
}

Pushboard.defaultProps = {
  board_width: null,
  board_height: null,
  letter_font_size: 50,
};

export default Pushboard;
