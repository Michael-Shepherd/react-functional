import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [squaresHistory, setSquaresHistory] = useState<string[][]>([squares]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");

  function handleSquareClick(index: number): void {
    if (squares[index] || isWinner()) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[index] = currentTurn;
    setCurrentTurn(calculateCurrentTurn());
    calculateWinner(nextSquares);
    setSquares(nextSquares);
    setSquaresHistory([...squaresHistory, nextSquares]);
    setCurrentHistoryIndex(currentHistoryIndex + 1);
  }

  function calculateCurrentTurn(): string {
    return currentTurn === "X" ? "O" : "X";
  }

  function isWinner() {
    return winner !== "";
  }

  function calculateWinner(squares: string[]) {
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
        setWinner(squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  //   function goBack(): void {
  //     if (currentHistoryIndex < 0) {
  //       return;
  //     } else if (currentHistoryIndex !== 0) {
  //       setCurrentHistoryIndex(currentHistoryIndex - 1);
  //     }
  //     setSquares(squaresHistory[currentHistoryIndex]);
  //   }

  return (
    <>
      {isWinner() && <h1>{winner} Won!</h1>}
      <div className="board">
        <div>
          <Square
            value={squares[0]}
            onSquareClick={() => handleSquareClick(0)}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleSquareClick(1)}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleSquareClick(2)}
          />
        </div>
        <div>
          <Square
            value={squares[3]}
            onSquareClick={() => handleSquareClick(3)}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleSquareClick(4)}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleSquareClick(5)}
          />
        </div>
        <div>
          <Square
            value={squares[6]}
            onSquareClick={() => handleSquareClick(6)}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleSquareClick(7)}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleSquareClick(8)}
          />
        </div>
      </div>
      <div>
        <ol>
          {squaresHistory.map((squaresInstance, index) => (
            <li id="index">
              <button
                onClick={() => {
                  setSquares(squaresInstance);
                  setCurrentHistoryIndex(index);
                }}
              >
                Go To step {index}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Board;
