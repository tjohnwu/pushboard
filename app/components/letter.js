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
    this.stickyToMouse(this.letterComponent.current, this.props);
  }

  stickyToMouse(item, props) {
    var currentX = 0,
      currentY = 0,
      previousX = 0,
      previousY = 0,
      initialOffsetLeft = 0,
      initialOffsetTop = 0;
    const
      maxLetterOffsetLeft = props.maxLetterOffsetLeft,
      maxLetterOffsetTop = props.maxLetterOffsetTop,
      minLetterOffsetLeft = props.minLetterOffsetLeft,
      minLetterOffsetTop = props.minLetterOffsetTop;

    item.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      previousX = e.clientX;
      previousY = e.clientY;

      initialOffsetLeft = item.offsetLeft;
      initialOffsetTop = item.offsetTop;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      currentX = previousX- e.clientX;
      currentY = previousY- e.clientY;
      previousX = e.clientX;
      previousY = e.clientY;

      setCoordStyle(item.offsetTop - currentY, item.offsetLeft - currentX);
    }

    function setCoordStyle(top, left) {
      item.style.top = top + "px";
      item.style.left = left + "px";
    }

    function closeDragElement() {
      if (item.offsetLeft > maxLetterOffsetLeft || item.offsetLeft < minLetterOffsetLeft || item.offsetTop > maxLetterOffsetTop || item.offsetTop < minLetterOffsetTop) {
        setCoordStyle(initialOffsetTop, initialOffsetLeft);
      }

      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  deleteSelf() {
    this.props.deleteLetter(this.props.parentKey);
  }

  render() {
    // Uses unicode for trashcan emoji
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
