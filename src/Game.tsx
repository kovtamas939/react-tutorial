import React, { useState } from "react";
import Board from "./Board";

type SquareValue = "X" | "O" | null;

const Game: React.FC = () => {
  const [history, setHistory] = useState<
    { squares: SquareValue[]; currentClick: number }[]
  >([{ squares: Array(9).fill(null), currentClick: 0 }]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [ascending, setAscending] = useState<boolean>(true);

  const handleClick = (i: number): void => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(historyCopy.concat({ squares: squares, currentClick: i }));
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const toggleButton = () => {
    setAscending(!ascending);
  };

  const calculateWinner = (
    squares: SquareValue[]
  ): { winner: SquareValue; winnerSquares: number[] } | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winnerSquares: lines[i] };
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const gameIsOver = calculateWinner(current.squares);
  let winner;
  let winnerSquares: boolean | number[] = false;

  if (gameIsOver) {
    winner = gameIsOver.winner;
    winnerSquares = gameIsOver.winnerSquares;
  }

  const moves = history.map((step, move) => {
    // display the location for each move
    const currentClick = step.currentClick;
    let col = 1;
    if (currentClick === 1 || currentClick === 4 || currentClick === 7) {
      col = 2;
    } else if (currentClick === 2 || currentClick === 5 || currentClick === 8) {
      col = 3;
    }
    let row = 2;

    if (currentClick < 3) {
      row = 1;
    } else if (currentClick > 5) {
      row = 3;
    }

    // bold the currently selected item in the move list
    let boldClass: string = "";
    if (stepNumber === move) {
      boldClass = "boldCurrentMove";
    }

    const desc = move
      ? `Go to move # ${move} | col: ${col} row: ${row}`
      : "Go to game start";
    return (
      <li key={move}>
        <button className={boldClass} onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "DRAW";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winnerSquares={winnerSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleButton}>
          {ascending ? "ascending" : "descending"}
        </button>
        <ol>{ascending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
};

export default Game;
