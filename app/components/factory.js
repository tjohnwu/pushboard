import React from 'react';
import './factory.css';

// This component is the factory user interface that the user is able to use to
// manufacture letters.
class Factory extends React.Component {
  constructor(props) {
    super(props);
    this.props.addLetter.bind(this);
    this.handleAddLetterClick = this.handleAddLetterClick.bind(this);
  }

  handleAddLetterClick(e) {
    var value = document.getElementById('letter-input').value;
    this.props.addLetter(value);
  }

  render() {
    return (
      <div className="factory">
        <input id='letter-input' className="letter-input" type="test" maxLength="1"/>
        <input type="button" value="Add Letter" onClick={this.handleAddLetterClick}/>
      </div>
    )
  }
}

export default Factory;
