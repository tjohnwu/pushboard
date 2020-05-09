import React from "react";
import "./letter.css";

class Letter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragged: false,
      className: "letter",
    };

    this.letterComponent = React.createRef();
    this.props.deleteLetter.bind(this);
  }

  componentDidMount() {
    this.stickyToMouse(this.letterComponent.current);
  }

  stickyToMouse(item) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    item.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      item.style.top = item.offsetTop - pos2 + "px";
      item.style.left = item.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  deleteSelf() {
    this.props.deleteLetter(this.props.parentKey);
  }

  render() {
    const trashComponent = (
      <div className="trashcan" onClick={() => this.deleteSelf()}>
        &#128465;
      </div>
    );
    return (
      <div
        ref={this.letterComponent}
        onContextMenu={() => this.onRightClick()}
        onMouseOver={() => this.setState({ dragged: true })}
        onMouseLeave={() => this.setState({ dragged: false })}
        style={{
          backgroundColor: this.state.dragged ? "blue" : "#00000000",
          top: this.props.startingY,
          left: this.props.startingX,
          fontSize: this.props.fontsize,
          zIndex: this.state.dragged ? 1 : 0,
        }}
        className={this.state.className}
      >
        {this.state.dragged ? trashComponent : null}
        {this.props.value}
      </div>
    );
  }
}

Letter.defaultProps = {
  startingX: 100,
  startingY: 100,
};

export default Letter;
