import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import "./App.css";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const App = ({ location }) => {
  let [shouldPlay, updatePlayState] = useState(true);
  let [borderState, updateBorderState] = useState(1);
  const vidUrl = location.search.slice(1);

  useInterval(() => {
    borderState < 4 ? updateBorderState(borderState++) : updateBorderState(1);
  }, 1300);

  return (
    <div className="App">
      <div className={`Container Border-${borderState}`}>
        <button className="Button" onClick={() => updatePlayState(!shouldPlay)}>
          <ReactPlayer
            url={vidUrl}
            playing={shouldPlay}
            loop
            volume={0}
            muted
            width={360}
          />
        </button>
      </div>
    </div>
  );
};

export default App;
