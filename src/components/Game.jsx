import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import rockImage from '../assets/rock.png'; // Replace with your actual path
import paperImage from '../assets/paper.png'; // Replace with your actual path
import scissorsImage from '../assets/scissors.png'; // Replace with your actual path
import './Game.css';  // Import the custom styles

const choices = [
  { name: 'Rock', image: rockImage },
  { name: 'Paper', image: paperImage },
  { name: 'Scissors', image: scissorsImage }
];

const Game = () => {
  const { state } = useLocation();
  const { player1, player2 } = state;
  const [round, setRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [rounds, setRounds] = useState([]);
  const navigate = useNavigate();

  const decideWinner = () => {
    if (player1Choice === player2Choice) return 'Tie';
    if (
      (player1Choice === 'Rock' && player2Choice === 'Scissors') ||
      (player1Choice === 'Scissors' && player2Choice === 'Paper') ||
      (player1Choice === 'Paper' && player2Choice === 'Rock')
    ) {
      return 'Player 1 Wins!';
    }
    return 'Player 2 Wins!';
  };

  const handleChoice = async () => {
    const winner = decideWinner();

    // Save the round data
    const roundData = {
      roundNumber: round,
      player1Choice,
      player2Choice,
      result: winner,
    };

    setRounds([...rounds, roundData]);

    if (winner === 'Player 1 Wins!') {
      setScore((prevScore) => ({ ...prevScore, player1: prevScore.player1 + 1 }));
    } else if (winner === 'Player 2 Wins!') {
      setScore((prevScore) => ({ ...prevScore, player2: prevScore.player2 + 1 }));
    }
    setResult(winner);

    if (round < 6) {
      setRound(round + 1);
    } else {
      setGameOver(true);

      // Determine the final winner
      const finalWinner = score.player1 > score.player2 ? player1 : player2;

      // Save the game to the database
      try {
        await axios.post('https://rock-paper-scissors-be.onrender.com/api/games', {
          player1,
          player2,
          rounds: [...rounds, roundData],
          winner: finalWinner,
        });
      } catch (error) {
        console.error('Error saving game data:', error);
      }
    }
  };

  const goToScoreboard = () => {
    navigate('/scoreboard');
  };

  return (
    <div className="game-container">
      <h2 className="round-title">Round {round}</h2>
      <h3 className="players">{player1} vs {player2}</h3>

      {!gameOver ? (
        <>
          <div className="choice-container">
            <div className="player-choice">
              <h4>{player1}'s Choice</h4>
              {choices.map(({ name, image }) => (
                <button
                  key={name}
                  className={`choice-button ${name}`} // Add class for specific choice
                  onClick={() => setPlayer1Choice(name)}
                >
                  <img src={image} alt={name} className="choice-image" />
                </button>
              ))}
            </div>

            <div className="player-choice">
              <h4>{player2}'s Choice</h4>
              {choices.map(({ name, image }) => (
                <button
                  key={name}
                  className={`choice-button ${name}`} // Add class for specific choice
                  onClick={() => setPlayer2Choice(name)}
                >
                  <img src={image} alt={name} className="choice-image" />
                </button>
              ))}
            </div>
          </div>

          <button className="submit-button" onClick={handleChoice}>Submit Choices</button>

          <h3 className="result">Result: {result}</h3>
        </>
      ) : (
        <>
          <h2 className="game-over">Game Over! {score.player1 > score.player2 ? player1 : player2} Wins!</h2>
          <button className="scoreboard-button" onClick={goToScoreboard}>Go to Scoreboard</button>
        </>
      )}
    </div>
  );
};

export default Game;
