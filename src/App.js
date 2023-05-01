import logo from './logo.svg';
import productivity from './assets/productivity.gif'
import './App.css';
import './timer.css';
import * as React from "react";
import { render } from "react-dom";
import Timer from "./components/Timer"

function App() {
  const MINUTE=60
  const DEFAULT_BREAK=10*MINUTE
  const DEFAULT_WORK=20*MINUTE

  return (
    <div className="App" style={{ backgroundImage: `url(${productivity})` }}>
      <Timer></Timer>
    </div>
  );
}

export default App;
