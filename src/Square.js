import React from "react";

function Square(props) {
  const nameOfClass = ["square"];
  nameOfClass.push(props.winnerSquare ? "squareHighlighted" : null);

  return (
    <button className={nameOfClass.join(" ")} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
