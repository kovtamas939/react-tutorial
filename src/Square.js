import React from "react";

const Square = ({ onClick, value, winnerSquare }) => {
  const nameOfClass = ["square"];
  nameOfClass.push(winnerSquare ? "squareHighlighted" : null);

  return (
    <button className={nameOfClass.join(" ")} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
