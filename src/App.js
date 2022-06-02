import React, { useState, useRef, useEffect } from "react";
import { CircleSlider } from "react-circle-slider";
import "./App.css";
import { ReactComponent as Logo } from "./logo.svg";
import { sendSMS } from "./sms.js";

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
    setTimerActive(!timerActive);
  };

  const handleCheckin = () => {
    sendSMS("3604899963", "Hello Jeff");
    sendSMS("7343202495", "Hello Chris");
  };

  const handleCircleSlider = (value) => {
    setTimerActive(false);
    setSliderValue(value);
    setTimerValue(value * 60);
    setDisplayValue(toTime(value));
  };

  return (
    <div className="app">
      <main className="app-main">
        <Logo className="logo" />
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <div className="textContainer">{displayValue}</div>
          <CircleSlider
            ref={slider}
            value={sliderValue}
            stepSize={5}
            onChange={handleCircleSlider}
            size={250}
            max={120}
            gradientColorFrom="#ffcb05"
            gradientColorTo="#ffcb05"
            knobRadius={20}
            circleWidth={20}
          />
          <button
            onClick={handleStart}
            className="btn btn-small btn-start"
            style={{ marginBottom: "20px" }}
          >
            {timerActive && (
              <span className="material-symbols-outlined icon icon-pause">
                pause
              </span>
            )}
            {!timerActive && (
              <span className="material-symbols-outlined icon">play_arrow</span>
            )}
          </button>
        </div>
        <div className="contacts flow">
          <div className="contact box">
            <div className="name">Jeff</div>
            <div className="number">360-489-9963</div>
            <div className="remove">
              <span className="material-symbols-outlined contact-icon">
                do_not_disturb_on
              </span>
            </div>
          </div>
          <div className="contact box">
            <div className="name">Chris</div>
            <div className="number">734-320-2495</div>
            <div className="remove">
              <span className="material-symbols-outlined contact-icon">
                do_not_disturb_on
              </span>
            </div>
          </div>
        </div>
      </main>
      <footer className="app-footer">
        <button
          onClick={handleCheckin}
          className="btn btn-checkin"
          style={{ marginBottom: "20px" }}
        >
          <span className="material-symbols-outlined icon">done</span>
        </button>
        <nav className="app-footer-menu">
          <span className="material-symbols-outlined footer-icon">
            group_add
          </span>
          <span className="material-symbols-outlined footer-icon">info</span>
        </nav>
      </footer>
    </div>
  );
}

export default App;
