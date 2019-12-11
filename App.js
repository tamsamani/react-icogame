import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <p>Welcom Ico Game {this.state.name}</p>
      </div>
    );
  }
}

export default App;
