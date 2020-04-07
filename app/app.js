import React from 'react'
import ReactDOM from 'react-dom'

import Board from './components/board.js';
import Letter from './components/letter.js';

import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Board />
        <Letter />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
