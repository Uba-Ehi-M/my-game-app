import { useState, useEffect } from 'react';
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

const [xScore, setXScore] = useState(() => {
  return Number(localStorage.getItem('xScore')) || 0;
});
const [oScore, setOScore] = useState(() => {
  return Number(localStorage.getItem('oScore')) || 0;
});
const [drawScore, setDrawScore] = useState(() => {
  return Number(localStorage.getItem('drawScore')) || 0;
});

useEffect(() => {
  localStorage.setItem("xScore", xScore);
}, [xScore]);

useEffect(() => {
  localStorage.setItem("oScore", oScore);
}, [oScore]);

useEffect(() => {
  localStorage.setItem("drawScore", drawScore);
}, [drawScore]);



  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  };

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

  const findBestMove = (currentBoard, player) => {
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === "") {
      const testBoard = [...currentBoard];
      testBoard[i] = player;

      if (checkWinner(testBoard) === player) {
        return i;
      }
    }
  }

  return null;
};

  const computerMove = (currentBoard) => {
      let move;

  move = findBestMove(currentBoard, "O");

  if (move === null) {
    move = findBestMove(currentBoard, "X");
  }

  if (move === null && currentBoard[4] === "") {
    move = 4;
  }

  if (move === null) {
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(
      (index) => currentBoard[index] === ""
    );

    if (availableCorners.length > 0) {
      move =
        availableCorners[
          Math.floor(Math.random() * availableCorners.length)
        ];
    }
  }

  // 5. Take any empty square
  if (move === null) {
    const emptySquares = currentBoard
      .map((square, index) => (square === "" ? index : null))
      .filter((index) => index !== null);

     move =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

    const newBoard = [...currentBoard];
    newBoard[move] = "O";

    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner) {
      setOScore((prev) => prev + 1);

      setTimeout(() => {
        alert("Computer Wins!");
        restartGame();
      }, 500);

      return;
    }

    if (newBoard.every((square) => square !== "")) {
      setDrawScore((prev) => prev + 1);

      setTimeout(() => {
        alert("It's a Draw!");
        restartGame();
      }, 500);

      return;
    }

    setIsXTurn(true);
  };

  const handleClick = (index) => {
    if (board[index] || !isXTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner) {
      setXScore((prev) => prev + 1);

      setTimeout(() => {
        alert("You Win!");
        restartGame();
      }, 500);

      return;
    }

    if (newBoard.every((square) => square !== "")) {
      setDrawScore((prev) => prev + 1);

      setTimeout(() => {
        alert("It's a Draw!");
        restartGame();
      }, 500);

      return;
    }

    setIsXTurn(false);

    setTimeout(() => {
      computerMove(newBoard);
    }, 600);
  };


  return (
    <div className="min-h-screen flex bg-[#112632] justify-center items-center">
      <div className="w-[420px]">
        <Header 
          isXTurn={isXTurn}
          restartGame={restartGame}/>
        <GameBoard  board={board} handleClick={handleClick}/>
        <ScoreBoard  xScore={xScore} drawScore={drawScore} oScore={oScore}/>

      </div>

    </div>
  )
}

export default App