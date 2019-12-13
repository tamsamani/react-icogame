import React, { Component } from "react";

class Point {
  displayName = "Point";
  constructor(x = 0, y = 0) {
    this.x = 0;
    this.y = 0;
  }

  jump(x, y) {
    !isNaN(x) && (this.x = x);
    !isNaN(y) && (this.y = y);
  }

  move(dx, dy) {
    !isNaN(dx) && (this.x += dx);
    !isNaN(dy) && (this.y += dy);
  }

  toString() {
    return `[${this.displayName}]{x:${this.x}, y:${this.y}}`;
  }
}

class Camera extends Point {
  constructor() {
    super();
    this.displayName = "Camera";
  }
}

class App extends Component {
  camera = new Camera();
  state = {
    cameraPosition: this.camera.toString()
  };

  handlerStore = {
    isDown: false,
    capture: [0, 0]
  };

  touchDownHandler(event) {
    this.handlerStore.isDown = true;
    this.handlerStore.capture = [event.clientX, event.clientY];
  }
  touchMoveHandler(event) {
    if (this.handlerStore.isDown) {
      // camera move handling
      let [cX, cY] = this.handlerStore.capture;

      // compare variation
      let dx = event.clientX - cX;
      let dy = event.clientY - cY;

      this.camera.move(dx, dy);

      // set new capture
      this.handlerStore.capture = [event.clientX, event.clientY];

      this.setState({
        cameraPosition: this.camera.toString()
      });
    }
  }
  touchUpHandler(event) {
    this.handlerStore.isDown = false;
    this.handlerStore.capture = [0, 0];

    // set new Position
    this.setState({
      cameraPosition: this.camera.toString()
    });
  }

  render() {
    let { cameraPosition } = this.state;
    return (
      <div className="play-ground">
        <div
          className="board-control"
          onPointerDown={e => this.touchDownHandler(e)}
          onPointerUp={e => this.touchUpHandler(e)}
          onPointerMove={e => this.touchMoveHandler(e)}
        />
        <div
          className="camera"
          style={{
            left: this.camera.x,
            top: this.camera.y
          }}
        >
          {cameraPosition.toString()}
        </div>
        <div>Player </div>
      </div>
    );
  }
}

export default App;
