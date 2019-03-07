import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./App.css";

class App extends Component {
  render() {
    const vidUrl = this.props.location.search.slice(1);
    return (
      <div className="App">
        <ReactPlayer url={vidUrl} playing controls />
      </div>
    );
  }
}

export default App;
