import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>{this.props.location.search}</p>
      </div>
    );
  }
}

export default App;
