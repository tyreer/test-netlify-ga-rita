import React, { Component, useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";

const App = ({ location }) => {
  let [shouldPlay, updatePlayState] = useState(true);

  const vidUrl = location.search.slice(1);
  return (
    <div className="App">
      <ReactPlayer
        className="Video"
        url={vidUrl}
        playing={shouldPlay}
        loop
        volume={0}
        muted
        width={360}
      />
      <button className="Button" onClick={() => updatePlayState(!shouldPlay)}>
        ⏯
      </button>
    </div>
  );
};

export default App;
