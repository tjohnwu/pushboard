import React from "react";
import "./factory.css";

// This component is the factory user interface that the user is able to use to
// manufacture letters.
class Factory extends React.Component {
  constructor(props) {
    super(props);
    this.props.addLetters.bind(this);
    this.props.clearLetters.bind(this);
    this.handleAddLettersClick = this.handleAddLettersClick.bind(this);
    this.handleLetterClear = this.handleLetterClear.bind(this);

    this.letterInputComponent = React.createRef();
  }

  handleAddLettersClick(e) {
    var value = this.letterInputComponent.current.value;
    this.props.addLetters(value);
  }

  handleLetterClear(e) {
    this.props.clearLetters();
  }

  render() {
    return (
      <div className="factory">
        <input
          className="letter-input"
          type="input"
          ref={this.letterInputComponent}
        />
        <input
          type="button"
          value="Add Letters"
          onClick={this.handleAddLettersClick}
        />
        <input
          type="button"
          value="Clear All"
          onClick={this.handleLetterClear}
        />
      </div>
    );
  }
}

export default Factory;
