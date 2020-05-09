import React from "react";
import "./board.css";

class Board extends React.Component {
  render() {
    return (
      <div className="board"
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      />
    );
  }
}

export default Board;
