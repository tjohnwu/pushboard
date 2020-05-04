import React from "react";
import "./factory.css";

// This component is the factory user interface that the user is able to use to
// manufacture letters.
class Factory extends React.Component {
  constructor(props) {
    super(props);
    this.props.addLetter.bind(this);
    this.props.clearLetters.bind(this);
    this.handleAddLetterClick = this.handleAddLetterClick.bind(this);
    this.handleLetterClear = this.handleLetterClear.bind(this);

    this.letterInputComponent = React.createRef();
  }

  handleAddLetterClick(e) {
    var value = this.letterInputComponent.current.value;
    this.props.addLetter(value);
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
          maxLength="1"
          ref={this.letterInputComponent}
        />
        <input
          type="button"
          value="Add Letter"
          onClick={this.handleAddLetterClick}
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
