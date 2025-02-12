import { useState, React } from "react";
import html2canvas from "html2canvas"; // will use to take and save images
import "./styles/App.css";
import Board from "./components/board.js";

function TicTacToeGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  // const [winner, setWinner] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /* 
  const handleUpdateWinner = (winnerValue) => {
    setWinner(winnerValue);
    saveBoardImage(winner);
  };
  */

  // to save the board
  /* 
   const saveBoardImage = (winner) => {
    const element = document.getElementById("board");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      console.log("Board image saved:", imgData);
      setGameHistory([...gameHistory, { winner, imgData }]);
    });
  };
  */

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-history">
        <p>Game history</p>
        {/*
        <ul>
          {gameHistory.map((game, index) => {
            <li key={index}>Winner: {game.winner}</li>;
            <img
              src={game.imgData}
              alt={`Game ${index + 1} Board`}
              style={{ width: "100px", height: "100px" }}
            />;
          })}
        </ul>
        */}
      </div>
    </div>
  );
}

export default TicTacToeGame;
