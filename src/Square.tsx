import React from "react";

interface Props {
  onClick(): void;
  value: "X" | "O" | null;
  winnerSquare: boolean;
}

const Square: React.FC<Props> = ({ onClick, value, winnerSquare }) => {
  const nameOfClass = ["square"];
  if (winnerSquare) {
    nameOfClass.push("squareHighlighted");
  }

  return (
    <button className={nameOfClass.join(" ")} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
