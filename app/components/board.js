import React from "react";
import "./board.css";

// Wrapping the component to forward the ref
class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { forwardRef, ...rest } = this.props;
    return (
      <div
        className="board"
        ref={forwardRef}
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      />
    );
  }
}

const Board = React.forwardRef((props, ref) => {
  return <BoardComponent forwardRef={ref} {...props} />;
});

export default Board;
