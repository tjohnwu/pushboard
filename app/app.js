import React from 'react'
import ReactDOM from 'react-dom'

import Pushboard from './components/pushboard.js';

class App extends React.Component {
  render() {
    return (
      <Pushboard />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
