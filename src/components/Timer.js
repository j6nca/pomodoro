import React, { useState, useEffect } from 'react';
import sound from "../assets/notification.wav"
const Timer = () => {
  const MINUTE=60;
  // const BREAK=10*MINUTE;
  // const WORK=20*MINUTE;
  const BREAK=5;
  const WORK=10;
  const [workTimer, setWorkTimer] = useState(WORK);
  const [breakTimer, setBreakTimer] = useState(BREAK);
  const [seconds, setSeconds] = useState(WORK);
  const [isActive, setIsActive] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    const start = isWorking? workTimer:breakTimer;
    setSeconds(start);
    setIsActive(false);
  }

  function notify() {
    new Audio(sound).play()
  }

  function skip(){
    setIsWorking(isWorking => !isWorking)
  }

  function nextTimer(){
    const start = isWorking? workTimer:breakTimer;
    setSeconds(start);
  }

  function toggleShowSettings(){
    setShowSettings(showSettings => !showSettings)
  }

  const handleWork = event => {
    console.log('New Work Timer:', event.target.value);
    setWorkTimer(event.target.value)
  };

  const handleBreak = event => {
    console.log('New Break Timer:', event.target.value);
    setBreakTimer(event.target.value)
  };

  function formatTime(seconds){
    return Math.floor(seconds/MINUTE).toString().padStart(2, '0') + ":" + (seconds%60).toString().padStart(2, '0')
  };

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
      notify()
      skip()
    }
    document.title = `[${isWorking ? 'WORK' : 'BREAK'} MODE${isActive ? '' : ' (PAUSED)'}] ${formatTime(seconds)}`;
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    nextTimer()
  }, [isWorking])
  
  return (
    <div className="app">
      <p>Currently: {isWorking ? 'Work Mode 🐱‍💻' : 'Break Mode 🌴'}</p>
      <div className="time">
        {formatTime(seconds)}
      </div>
      <p><small>(mm:ss)</small></p>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={skip}>
          Skip
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
        <button className="button" onClick={toggleShowSettings}>
          Settings
        </button>
        {showSettings?
        <div className="settings">
          <label for="work">Work Timer:</label>
          <input type="number" id="work" name="work" min="1" max="60" defaultValue={workTimer} onChange={handleWork}/>
          <label for="break">Break Timer:</label>
          <input type="number" id="break" name="break" min="1" max="60" defaultValue={breakTimer} onChange={handleBreak}/>
        </div>
        :<div/>}
      </div>
    </div>
  );
};

export default Timer;