import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlayerForm.css';  // Importing the custom styles
import gameIcon from '../assets/rp.png'; // Replace with the actual path to your image

const PlayerForm = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const startGame = () => {
    if (player1 && player2) {
      navigate('/game', { state: { player1, player2 } });
    }
  };

  return (
    <div className="form-container">
      <img src={gameIcon} alt="Game Icon" className="rotating-image" /> {/* Rotating Image */}
      <h2 className="form-title">Enter Player Names</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        className="input-field"
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button className="start-button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default PlayerForm;
