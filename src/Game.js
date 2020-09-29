import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      ascending: true,
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares: squares, currentClick: i }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  toggleButton() {
    this.setState({ ascending: !this.state.ascending });
  }

  calculateWinner(squares) {
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
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      // display the location for each move
      const currentClick = step.currentClick;
      let col = 1;
      if (currentClick === 1 || currentClick === 4 || currentClick === 7) {
        col = 2;
      } else if (
        currentClick === 2 ||
        currentClick === 5 ||
        currentClick === 8
      ) {
        col = 3;
      }
      let row = 2;

      if (currentClick < 3) {
        row = 1;
      } else if (currentClick > 5) {
        row = 3;
      }

      // bold the currently selected item in the move list
      let boldClass = null;
      if (this.state.stepNumber === move) {
        boldClass = "boldCurrentMove";
      }

      const desc = move
        ? `Go to move # ${move} | col: ${col} row: ${row}`
        : "Go to game start";
      return (
        <li key={move}>
          <button className={boldClass} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={this.toggleButton}>
            {this.state.ascending ? "ascending" : "descending"}
          </button>
          <ol>{this.state.ascending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
