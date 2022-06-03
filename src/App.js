import React, { useState, useRef, useEffect } from "react";
import { CircleSlider } from "react-circle-slider";
import "./App.css";
import { ReactComponent as Logo } from "./logo.svg";
//import { sendSMS } from "./sms.js";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function App() {
  const [sliderValue, setSliderValue] = useState(60);
  const [timerValue, setTimerValue] = useState(3600);
  const [displayValue, setDisplayValue] = useState("1:00:00");
  const [checkInTime, setCheckInTime] = useState(3600);
  const [timerActive, setTimerActive] = useState(false);
  const slider = useRef(null);

  useEffect(() => {
    if (!timerActive) return;
    if (timerValue === 60) {
      handleNotification("Heads Up", "You have 1 minutes left to check-in");
    }
    if (timerValue === 0) {
      handleNotification(
        "Check-In Missed",
        "A text message has been sent to your contacts"
      );
    }
    if (timerValue === -10) {
      handleNotification(
        "Check-In Past Due",
        "You are 10 seconds past due checking-in"
      );
    }
    const interval = setInterval(() => {
      const newValue = timerValue - 1;
      const newDisplayValue = secondsToHms(timerValue - 1);
      setTimerValue(newValue);
      setDisplayValue(newDisplayValue);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timerValue]);

  function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const hDisplay = h > 0 ? `${h}:` : "";
    const mDisplay = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:";
    const sDisplay = s > 0 ? (s < 10 ? `0${s}` : `${s}`) : "00";
    return hDisplay + mDisplay + sDisplay;
  }

  const handleStop = () => {
    setTimerActive(false);
  };

  const handleCheckin = () => {
    if (!timerActive) {
      setTimerActive(true);
    } else {
      setTimerValue(checkInTime);
      setDisplayValue(secondsToHms(checkInTime));
      handleNotification(
        "Check-In Successful!",
        `${secondsToHms(checkInTime)} until your next check-in`
      );
    }
    //endSMS("3604899963", "Hello Jeff");
    //sendSMS("7343202495", "Hello Chris");
  };

  const handleCircleSlider = (value) => {
    setTimerActive(false);
    setSliderValue(value);
    setTimerValue(value * 60);
    setDisplayValue(secondsToHms(value * 60));
    setCheckInTime(value * 60);
  };

  const handleNotification = (title, message) => {
    NotificationManager.warning(message, title, 5000, () => {
      console.log("alert");
    });
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
            stepSize={1}
            onChange={handleCircleSlider}
            size={250}
            max={120}
            gradientColorFrom="#ffcb05"
            gradientColorTo="#ffcb05"
            knobRadius={20}
            circleWidth={20}
          />
          {timerActive && (
            <button
              onClick={handleStop}
              className="btn btn-small btn-start"
              style={{ marginBottom: "20px" }}
            >
              <span className="stop"></span>
            </button>
          )}
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
          {timerActive && (
            <span className="material-symbols-outlined icon">done</span>
          )}
          {!timerActive && (
            <span className="material-symbols-outlined icon">play_arrow</span>
          )}
        </button>
        <nav className="app-footer-menu">
          <span className="material-symbols-outlined footer-icon">
            group_add
          </span>
          <button
            className="footer-button"
            onClick={() => handleNotification("Title Here", "Hello World")}
          >
            <span class="material-symbols-outlined footer-icon">
              manage_accounts
            </span>
          </button>
        </nav>
      </footer>
      <NotificationContainer />
    </div>
  );
}

export default App;
