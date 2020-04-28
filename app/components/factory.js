import React from 'react';
import './factory.css';

// This component is the factory user interface that the user is able to use to
// manufacture letters.
class Factory extends React.Component {
  render() {
    return (
      <div className="factory">
        <input class="letter-input" type="test" maxlength="1"/>
        <input type="button" value="Add Letter" />
      </div>
    )
  }
}

export default Factory;
