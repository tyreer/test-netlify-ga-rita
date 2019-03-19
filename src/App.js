import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ReactPlayer from "react-player";
import { useWindowWidth, useInterval } from "./Hooks.js";
import "./App.css";

const App = ({ location }) => {
  let [videoPlaying, setVideoPlaying] = useState(true);
  let [borderState, setBorderState] = useState(1);

  // Use video url passed in as search param or fallback self-hosted video
  const vidUrl =
    location.search.slice(1) ||
    "http://techslides.com/demos/sample-videos/small.mp4";

  // Rotate border colors
  const intervalDelay = 1300;
  useInterval(
    () => {
      borderState <= 4 ? setBorderState(borderState++) : setBorderState(1);
    },
    videoPlaying ? intervalDelay : null
  );

  // Animate on mouseover on wide views
  const [springProps, set] = useSpring(() => ({
    transform: "scale(3.5)",
    config: { mass: 2, tension: 500, friction: 40 }
  }));

  // Check screen width
  const isNarrow = useWindowWidth() < 400;

  return (
    <div className="App">
      <div className={`Border-${borderState}`}>
        <animated.div
          className="Card"
          onMouseEnter={() => set({ transform: "scale(10)" })}
          onMouseLeave={() => set({ transform: "scale(3.5)" })}
          style={
            isNarrow
              ? { transform: "scale(5)" }
              : { transform: springProps.transform }
          }
        >
          <button
            className="Button"
            onClick={() => {
              setVideoPlaying(!videoPlaying);
            }}
          >
            <ReactPlayer
              className="Video"
              url={vidUrl}
              playing={videoPlaying}
              loop
              volume={0}
              muted
              width={50}
              height={50}
              playsinline={true}
            />
          </button>
        </animated.div>
      </div>
    </div>
  );
};

export default App;
