import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import PlayerForm from './components/PlayerForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Rock Paper Scissors Game</h1>
        <Routes>
          <Route path="/" element={<PlayerForm />} />
          <Route path="/game" element={<Game />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
