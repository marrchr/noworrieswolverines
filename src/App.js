import React, { useState, useRef, useEffect, forwardRef } from "react";
import { CircleSlider } from "react-circle-slider";
import "./App.css";
import { ReactComponent as Logo } from "./logo.svg";
//import { sendSMS } from "./sms.js";
//MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [sliderValue, setSliderValue] = useState(60);
  const [timerValue, setTimerValue] = useState(3600);
  const [displayValue, setDisplayValue] = useState("1:00:00");
  const [checkInTime, setCheckInTime] = useState(3600);
  const [timerActive, setTimerActive] = useState(false);
  const slider = useRef(null);
  const [openSnackBar, setSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("success");

  useEffect(() => {
    if (!timerActive) return;
    if (timerValue === 60) {
      handleNotification(
        "warning",
        "Heads Up! You have 1 minutes left to check-in"
      );
    }
    if (timerValue === 0) {
      handleNotification(
        "error",
        "Check-In Missed - A text message has been sent to your contacts"
      );
    }
    if (timerValue === -10) {
      handleNotification(
        "error",
        "Check-In Past Due - You are 10 seconds past due checking-in"
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
        "success",
        `Check-In Successful! ${secondsToHms(
          checkInTime
        )} until your next check-in`
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

  const handleNotification = (alert, message) => {
    setSnackbarOpen(true);
    setAlert(alert);
    setMessage(message);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
          <button className="footer-button" onClick={handleClickOpen}>
            <span className="material-symbols-outlined footer-icon">
              group_add
            </span>
          </button>
          <button className="footer-button" onClick={handleClickOpen}>
            <span className="material-symbols-outlined footer-icon">
              manage_accounts
            </span>
          </button>
        </nav>
      </footer>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={alert} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a name and phone number of a person you would like notified
            if you don't check-in.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
