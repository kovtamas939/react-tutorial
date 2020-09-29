import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        onClick={() => this.props.onClick(i)}
        value={this.props.squares[i]}
      />
    );
  }

  render() {
    let squares = [];

    for (let i = 0; i < 3; i++) {
      let threeSquare = [];
      for (let j = 0; j < 3; j++) {
        threeSquare.push(this.renderSquare(i * 3 + j));
      }
      squares.push(
        <div key={i} className="board-row">
          {threeSquare}
        </div>
      );
    }

    return <div>{squares}</div>;
  }
}

export default Board;
