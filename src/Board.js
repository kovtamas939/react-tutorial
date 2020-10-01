import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, winnerSquares }) => {
  const renderSquare = (i) => {
    let winnersSquare;
    if (winnerSquares && winnerSquares.includes(i)) {
      winnersSquare = true;
    }

    return (
      <Square
        key={i}
        onClick={() => onClick(i)}
        value={squares[i]}
        winnerSquare={winnersSquare}
      />
    );
  };

  let squareElements = [];

  for (let i = 0; i < 3; i++) {
    let threeSquare = [];
    for (let j = 0; j < 3; j++) {
      threeSquare.push(renderSquare(i * 3 + j));
    }
    squareElements.push(
      <div key={i} className="board-row">
        {threeSquare}
      </div>
    );
  }

  return <div>{squareElements}</div>;
};

export default Board;
