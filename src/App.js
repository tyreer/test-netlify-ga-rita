import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
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

const animValues = scale => `perspective(600px) scale(${scale})`;

const App = ({ location }) => {
  let [shouldPlay, updatePlayState] = useState(true);
  let [borderState, updateBorderState] = useState(1);
  const vidUrl = location.search.slice(1);

  useInterval(() => {
    borderState < 4 ? updateBorderState(borderState++) : updateBorderState(1);
  }, 1300);

  const [props, set] = useSpring(() => ({
    scale: [1.5],
    config: { mass: 2, tension: 500, friction: 40 }
  }));

  return (
    <div className="App">
      <div className={`Container Border-${borderState}`}>
        <animated.div
          class="card"
          onMouseEnter={() => set({ scale: [6] })}
          onMouseLeave={() => set({ scale: [1.5] })}
          style={{ transform: props.scale.interpolate(animValues) }}
        >
          <button
            className="Button"
            onClick={() => updatePlayState(!shouldPlay)}
          >
            <ReactPlayer
              className="Video"
              url={vidUrl}
              playing={shouldPlay}
              loop
              volume={0}
              muted
              width={100}
              height={100}
              playsinline={true}
            />
          </button>
        </animated.div>
      </div>
    </div>
  );
};

export default App;
