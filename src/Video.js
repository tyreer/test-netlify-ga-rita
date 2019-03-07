import React, { Component } from "react";

class Video extends Component {
  render() {
    return (
      <div>
        <p>{this.props.location.search}</p>
      </div>
    );
  }
}

export default Video;
