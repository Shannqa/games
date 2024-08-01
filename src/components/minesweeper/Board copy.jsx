import React, { useContext, useState } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
import styles from "../../styles/minesweeper.module.css";

function Board() {
  const { chosenDifficulty, playerBoard, setPlayerBoard } =
    useContext(MinesweeperContext);
  const [emptyBoard, setEmptyBoard] = useState(() =>
    createEmptyBoard(chosenDifficulty.boardSize)
  );
  const [coordinateList, setCoordinateList] = useState(() =>
    generateMineList(chosenDifficulty.boardSize, chosenDifficulty.mines)
  );
  const [minesBoard, setMinesBoard] = useState(() =>
    placeMinesOnBoard(emptyBoard, coordinateList)
  );
  const [hiddenBoard, setHiddenBoard] = useState(() =>
    numberBoard(chosenDifficulty.boardSize, minesBoard)
  );

  function createEmptyBoard(boardSize) {
    let board = [];
    for (let c = 0; c < boardSize; c++) {
      board.push([]);
      for (let r = 0; r < boardSize; r++) {
        board[c].push(0);
      }
    }
    return board;
  }

  // generate a list of unique coordinates where mines will be placed
  function generateMineList(boardSize, mineAmount, coordinateList = []) {
    // base case
    if (coordinateList.length === mineAmount) return coordinateList;

    let row = Math.floor(Math.random() * boardSize);
    let col = Math.floor(Math.random() * boardSize);

    if (!coordinateList.some((coord) => coord[0] === row && coord[1] === col)) {
      //coordinate is unique
      coordinateList.push([row, col]);
    } else {
      // console.log("duplicate", [row, col]);
    }
    return generateMineList(boardSize, mineAmount, coordinateList);
  }

  function placeMinesOnBoard(board, coordinateList) {
    let fullBoard = [...board];
    coordinateList.forEach((coord) => {
      fullBoard[coord[0]][coord[1]] = 100;
    });
    return fullBoard;
  }

  // full hidden matrix with mines and numbers signifying proximity
  function numberBoard(boardSize, boardWithMines) {
    let board = [...boardWithMines];

    const adjacentCells = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        // check cell
        adjacentCells.forEach((cell) => {
          let x = row + cell[0];
          let y = col + cell[1];

          if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
            // exists on the board
            if (board[x][y] === 100 && board[row][col] !== 100) {
              // adjacentc cell is a mine, and current cell is not a mine
              console.log("adj");
              board[row][col] += 1;
            }
          }
        });
      }
    }
    // console.log(board);
    return board;
  }

  const classStyle = {
    100: `${styles.box} ${styles.mine}`,
    8: `${styles.box} ${styles.darkred}`,
    7: `${styles.box} ${styles.darkred}`,
    6: `${styles.box} ${styles.red}`,
    5: `${styles.box} ${styles.darkpurple}`,
    4: `${styles.box} ${styles.purple}`,
    3: `${styles.box} ${styles.darkblue}`,
    2: `${styles.box} ${styles.blue}`,
    1: `${styles.box} ${styles.lightblue}`,
    0: `${styles.box} ${styles.green}`,
  };

  const boardStyles = {
    beginner: `${styles.board} ${styles.beginner}`,
    intermediate: `${styles.board} ${styles.intermediate}`,
    expert: `${styles.board} ${styles.expert}`,
  };

  console.log(boardStyles.beginner);

  // clicks

  function handleTileClick(e, row, column) {
    if (hiddenBoard[row][column] === 100) {
      // clicked on a mine, game over
      setPlayerBoard(
        playerBoard.map((boardRow, rindex) =>
          boardRow.map((boardColumn, cindex) => {
            if (rindex == row && cindex == column) {
              boardColumn = "M";
            }
            return boardColumn;
          })
        )
      );
    } else if (playerBoard[row][column] === "x") {
      // already clicked here, do nothing
      return;
    } else if (hiddenBoard[row][column] > 0 && hiddenBoard[row][column] <= 8) {
      // clicked on a tile which is adjacent to a mine - open only this tile
      setPlayerBoard(
        playerBoard.map((boardRow, rindex) =>
          boardRow.map((boardColumn, cindex) => {
            if (rindex == row && cindex == column) {
              boardColumn = "x";
            }
            return boardColumn;
          })
        )
      );
    } else if (hiddenBoard[row][column] === 0) {
      // clicked on a tile which is not adjacent to a mine, open surrounding tiles
      let queue = [];
      queue.push([row, column]);

      function openAdjacentCells(queue) {
        if (queue.length === 0) {
          // base case
          return;
        }
        let currentCell = queue.pop();
        console.log(currentCell);

        // open current tile
        setPlayerBoard(
          playerBoard.map((boardRow, rindex) =>
            boardRow.map((boardColumn, cindex) => {
              if (rindex == currentCell[0] && cindex == currentCell[1]) {
                boardColumn = "x";
              }
              return boardColumn;
            })
          )
        );

        const adjacentCells = [
          [1, 0],
          [-1, 0],
          [0, -1],
          [0, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1],
        ];

        adjacentCells.forEach((cell) => {
          let x = currentCell[0] + cell[0];
          let y = currentCell[1] + cell[1];

          if (
            x >= 0 &&
            x < chosenDifficulty.boardSize &&
            y >= 0 &&
            y < chosenDifficulty.boardSize
          ) {
            // exists on the board
            if (hiddenBoard[x][y] === 0 && playerBoard[x][y] !== "x") {
              // if it's a 0 but it hasnt been revealed yet
              queue.push([x, y]);
            } else if (hiddenBoard[x][y] > 0 && hiddenBoard[x][y] <= 8) {
              // if it's a number between 1 and 8, open this tile
              setPlayerBoard(
                playerBoard.map((boardRow, rindex) =>
                  boardRow.map((boardColumn, cindex) => {
                    if (rindex == x && cindex == y) {
                      boardColumn = "x";
                    }
                    return boardColumn;
                  })
                )
              );
            }
          }
          // do the queue
        });
        openAdjacentCells(queue);
      }
      openAdjacentCells(queue);
    }
  }
  console.log(playerBoard);
  return (
    <>
      <div className={boardStyles[chosenDifficulty.name]}>
        {playerBoard.map((row, rindex) =>
          row.map((column, cindex) => (
            <div
              key={`${rindex}-${cindex}`}
              className={classStyle[column]}
              onClick={(e) => handleTileClick(e, rindex, cindex)}
            >
              {column}
            </div>
          ))
        )}
      </div>
      <div className={boardStyles[chosenDifficulty.name]}>
        {hiddenBoard.map((row, rindex) =>
          row.map((column, cindex) => (
            <div key={`${rindex}-${cindex}`} className={classStyle[column]}>
              {column}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Board;
