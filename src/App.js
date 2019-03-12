import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ReactPlayer from "react-player";
import { useWindowWidth, useInterval } from "./Hooks.js";
import "./App.css";

const animValues = scale => `scale(${scale})`;

const App = ({ location }) => {
  let [shouldPlay, updateShouldPlay] = useState(true);
  let [borderState, updateBorderState] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  // Use video url passed in as search param or fallback self-hosted video
  const vidUrl =
    location.search.slice(1) ||
    "http://techslides.com/demos/sample-videos/small.mp4";

  // Rotate border colors
  const intervalDelay = 1300;
  useInterval(
    () => {
      borderState <= 4
        ? updateBorderState(borderState++)
        : updateBorderState(1);
    },
    isRunning ? intervalDelay : null
  );

  // Animate on mouseover on wideviews
  const [props, set] = useSpring(() => ({
    scale: [3.5],
    config: { mass: 2, tension: 500, friction: 40 }
  }));

  // Check screen width
  const isNarrow = useWindowWidth() < 400;

  return (
    <div className="App">
      <div className={`Border-${borderState}`}>
        <animated.div
          className="Card"
          onMouseEnter={() => (isNarrow ? null : set({ scale: [12] }))}
          onMouseLeave={() => (isNarrow ? null : set({ scale: [3.5] }))}
          style={
            isNarrow
              ? { transform: `scale(5)` }
              : { transform: props.scale.interpolate(animValues) }
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
              width={isNarrow ? 50 : 50}
              height={isNarrow ? 50 : 50}
              playsinline={true}
            />
          </button>
        </animated.div>
      </div>
    </div>
  );
};

export default App;
