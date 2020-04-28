import React from 'react';
import './factory.css';

// This component is the factory user interface that the user is able to use to
// manufacture letters.
class Factory extends React.Component {
  constructor(props) {
    super(props);
    this.props.onAddLetterClick.bind(this);
  }

  render() {
    return (
      <div className="factory">
        <input className="letter-input" type="test" maxLength="1"/>
        <input type="button" value="Add Letter" onClick={this.props.onAddLetterClick}/>
      </div>
    )
  }
}

export default Factory;
