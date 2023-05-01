import React, { useState, useEffect } from 'react';

const Timer = () => {
  const MINUTE=60;
  const BREAK=5;
  const WORK=10;
  const [seconds, setSeconds] = useState(WORK);
  const [isActive, setIsActive] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    const start = isWorking? WORK:BREAK;
    setSeconds(start);
    setIsActive(false);
  }

  function nextTimer(){
    console.log("isWorking1", isWorking)
    setIsWorking(!isWorking)
    console.log("isWorking2", isWorking)
    const start = isWorking? WORK:BREAK;
    setSeconds(start);
  }

  function formatTime(seconds){
    return Math.floor(seconds/MINUTE).toString().padStart(2, '0') + ":" + (seconds%60).toString().padStart(2, '0')
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds <= 0) {
      // Stop clock and clean up
      // clearInterval(interval);
      // Switch between pomodoro modes
      
      nextTimer()
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time">
        {formatTime(seconds)}
      </div>
      <p>(mm:ss)</p>
      <p>Currently: {isWorking ? 'Work Mode' : 'Break Mode'}</p>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;