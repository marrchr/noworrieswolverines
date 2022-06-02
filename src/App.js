import React, { useState, useRef, useEffect } from "react";
import { CircleSlider } from "react-circle-slider";
import "./App.css";

function App() {
  const [sliderValue, setSliderValue] = useState(60);
  const [timerValue, setTimerValue] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const slider = useRef(null);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimerValue(timerValue - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timerValue]);

  const handleStart = () => {
    setTimerActive(true);
  };

  const handleCheckin = () => {
    setTimerActive(false);
  };

  const handleCircleSlider = (value) => {
    setTimerActive(false);
    setSliderValue(value);
    setTimerValue(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>No Worries Wolverines</h2>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <div className="textContainer">
            {sliderValue}
            <div className="minute">MINUTES</div>
          </div>
          <CircleSlider
            ref={slider}
            value={sliderValue}
            stepSize={5}
            onChange={handleCircleSlider}
            size={250}
            max={120}
            gradientColorFrom="#ec008c"
            gradientColorTo="#fc6767"
            knobRadius={20}
            circleWidth={20}
          />
        </div>
        <button onClick={handleStart} style={{ marginBottom: "20px" }}>
          Start
        </button>
        <div style={{ marginBottom: "20px" }}>
          Time left till checkin: {timerValue}
        </div>
        <button onClick={handleCheckin} style={{ marginBottom: "20px" }}>
          Checkin
        </button>
      </header>
    </div>
  );
}

export default App;
