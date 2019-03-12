import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ReactPlayer from "react-player";
import { useWindowWidth, useInterval } from "./Hooks.js";
import "./App.css";

const animValues = scale => `perspective(600px) scale(${scale})`;

const App = ({ location }) => {
  let [shouldPlay, updateShouldPlay] = useState(true);
  let [borderState, updateBorderState] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  const vidUrl = location.search.slice(1);

  const intervalDelay = 1300;
  useInterval(
    () => {
      borderState < 4 ? updateBorderState(borderState++) : updateBorderState(1);
    },
    isRunning ? intervalDelay : null
  );

  const [props, set] = useSpring(() => ({
    scale: [1.5],
    config: { mass: 2, tension: 500, friction: 40 }
  }));

  const isNarrow = useWindowWidth() < 400;

  return (
    <div className="App">
      <div className={`Container Border-${borderState}`}>
        <animated.div
          class="card"
          onMouseEnter={() => (isNarrow ? null : set({ scale: [6] }))}
          onMouseLeave={() => (isNarrow ? null : set({ scale: [1.5] }))}
          style={
            isNarrow ? null : { transform: props.scale.interpolate(animValues) }
          }
        >
          <button
            className="Button"
            onClick={() => {
              updateShouldPlay(!shouldPlay);
              setIsRunning(!isRunning);
            }}
          >
            <ReactPlayer
              className="Video"
              url={vidUrl}
              playing={shouldPlay}
              loop
              volume={0}
              muted
              width={isNarrow ? 200 : 100}
              height={isNarrow ? 200 : 100}
              playsinline={true}
            />
          </button>
        </animated.div>
      </div>
    </div>
  );
};

export default App;
