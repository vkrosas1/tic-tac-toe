import { useState, useEffect, React } from "react";
import html2canvas from "html2canvas"; // will use to take and save images
import "./styles/App.css";
import Board from "./components/board.js";

function TicTacToeGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const handleUpdateWinner = (winnerValue) => {
    setWinner(winnerValue);
    if (winnerValue != null) {
      saveBoardImage(winnerValue);
      setTimeout(() => handleGameReset(), 10);
    }
  };

  function handleItemClick(game) {
    setSelectedGame(game);
    setImageVisible(true);
  }

  const handleCloseImage = () => {
    setImageVisible(false);
  };

  function handleGameReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
  }

  const saveBoardImage = async (winner) => {
    const element = document.getElementById("root");
    await html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setGameHistory([...gameHistory, { winner, imgData }]);
    });
  };

  return (
    <div className="game-canvas">
      <div className="game-title">
        <h1>Welcome to the Game</h1>
      </div>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            onWinnerUpdate={handleUpdateWinner}
          />
        </div>
        <div className="game-history">
          <p>Game history:</p>
          <ul>
            {gameHistory.map((game, index) => {
              return (
                <li key={index} onClick={() => handleItemClick(game)}>
                  {game.winner}
                </li>
              );
            })}
          </ul>
          {selectedGame && imageVisible && (
            <div className="selected-game-image">
              <img src={selectedGame.imgData} />
              <button className="closeImg" onClick={handleCloseImage}>
                Close Image
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="game-reset">
        <button className="restart-button" onClick={handleGameReset}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToeGame;
