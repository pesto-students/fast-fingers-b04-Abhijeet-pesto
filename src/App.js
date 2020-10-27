import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {Game} from './Components/Game/Game';


function App() {
  return (
    <div className="App">
        <Game word="window"/>
    </div>
  );
}

export default App;
