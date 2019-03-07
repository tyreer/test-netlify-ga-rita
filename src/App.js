import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p> {this.props.videoUrl}</p>
      </div>
    );
  }
}

export default App;
