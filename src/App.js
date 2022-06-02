import React, { useState, useRef } from "react";
import { CircleSlider } from "react-circle-slider";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const slider = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>No Worries Wolverines</h1>
        <div style={{ position: "relative" }}>
          <div className="textContainer">
            {value}
            <div className="minute">MINUTES</div>
          </div>
          <CircleSlider
            ref={slider}
            value={value}
            stepSize={5}
            onChange={(value) => setValue(value)}
            size={250}
            max={120}
            gradientColorFrom="#ec008c"
            gradientColorTo="#fc6767"
            knobRadius={20}
            circleWidth={20}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
