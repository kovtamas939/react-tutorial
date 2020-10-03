import React, { ReactNode } from "react";
import Square from "./Square";

type SquareValue = "X" | "O" | null;

interface Props {
  squares: SquareValue[];
  onClick(i: number): void;
  winnerSquares: false | Array<number>;
}

const Board: React.FC<Props> = ({ squares, onClick, winnerSquares }) => {
  const renderSquare = (i: number): ReactNode => {
    let winnersSquare = false;
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
