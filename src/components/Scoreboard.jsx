import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Scoreboard.css'; // Import custom CSS

const Scoreboard = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/games').then((response) => setGames(response.data));
  }, []);

  return (
    <div className="scoreboard-container">
      <h2 className="scoreboard-title">Past Games</h2>
      <ul className="games-list">
        {games.map((game, index) => (
          <li className="game-item" key={index}>
            <div className="game-info">
              <span className="players">
                {game.player1} <span className="vs">vs</span> {game.player2}
              </span>
              <span className="winner">Winner: {game.winner}</span>
              <span className="date">Date: {new Date(game.date).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
