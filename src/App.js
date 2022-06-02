import React, { useState, useRef, useEffect } from "react";
import { CircleSlider } from "react-circle-slider";
import "./App.css";

function App() {
  const [sliderValue, setSliderValue] = useState(60);
  const [timerValue, setTimerValue] = useState(3600);
  const [displayValue, setDisplayValue] = useState("01:00:00");
  const [timerActive, setTimerActive] = useState(false);
  const slider = useRef(null);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      const newValue = timerValue - 1;
      const newDisplayValue = toTime(timerValue - 1);
      setTimerValue(newValue);
      setDisplayValue(newDisplayValue);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timerValue]);

  const toTime = (seconds) => {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  const handleStart = () => {
    setTimerActive(true);
  };

  const handleCheckin = () => {
    setTimerActive(false);
  };

  const handleCircleSlider = (value) => {
    setTimerActive(false);
    setSliderValue(value);
    setTimerValue(value * 60);
    setDisplayValue(toTime(value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>No Worries Wolverines</h2>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <div className="textContainer">{displayValue}</div>
          <CircleSlider
            ref={slider}
            value={sliderValue}
            stepSize={5}
            onChange={handleCircleSlider}
            size={250}
            max={120}
            gradientColorFrom="#fffe52"
            gradientColorTo="#ffcb05"
            knobRadius={20}
            circleWidth={20}
          />
        </div>
        <div className="controls box">
          <button
            onClick={handleStart}
            className="btn btn-start"
            style={{ marginBottom: "20px" }}
          >
            <span className="material-symbols-outlined play-icon">
              play_arrow
            </span>
          </button>
          <button
            onClick={handleCheckin}
            className="btn btn-checkin"
            style={{ marginBottom: "20px" }}
          >
            <span class="material-symbols-outlined check-icon">done</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
