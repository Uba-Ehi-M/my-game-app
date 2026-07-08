import { useState } from 'react';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';


function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

    const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

const [xScore, setXScore] = useState(0);
const [oScore, setOScore] = useState(0);
const [drawScore, setDrawScore] = useState(0);

  const checkWinner = (currentBoard) => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return currentBoard[a];
    }
  }

  return null;
};

const handleClick = (index) => {
  if (board[index]) return;

  const newBoard = [...board];
  newBoard[index] = isXTurn ? "X" : "O";

  setBoard(newBoard);

  const winner = checkWinner(newBoard);

  if (winner) {
  if (winner === "X") {
    setXScore((prev) => prev + 1);
  } else {
    setOScore((prev) => prev + 1);
  }

    setTimeout(() => {
    alert(`${winner} Wins!`);
    restartGame();
  }, 100);

  return;
}
 

  if (newBoard.every((square) => square !== "")) {
  setDrawScore((prev) => prev + 1);
  alert("It's a Draw! 🤝");
  restartGame();
  return;
}

  setIsXTurn(!isXTurn);
};


  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  };


  return (
    <div className="min-h-screen flex bg-[#112632] justify-center items-center">
      <div className="w-[420px]">
        <Header 
          isXTurn={isXTurn}
          restartGame={restartGame}/>
        <GameBoard  board={board} handleClick={handleClick}/>
        <ScoreBoard  XScore={xScore} drawScore={drawScore} OScore={oScore}/>

      </div>

    </div>
  )
}

export default App