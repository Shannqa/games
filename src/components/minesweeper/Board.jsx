import React, { useContext, useState } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
import styles from "../../styles/minesweeper.module.css";

function Board() {
  const { chosenDifficulty } = useContext(MinesweeperContext);

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

  const coordinateList = generateMineList(
    chosenDifficulty.boardSize,
    chosenDifficulty.mines
  );
  const emptyBoard = createEmptyBoard(chosenDifficulty.boardSize);
  const fullBoard = placeMinesOnBoard(emptyBoard, coordinateList);
  const ready = numberBoard(chosenDifficulty.boardSize, fullBoard);
  // console.log("ready", ready);

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

  return (
    <div className={boardStyles[chosenDifficulty.name]}>
      {ready.map((row, rindex) =>
        row.map((column, cindex) => (
          <div className={classStyle[column]}>{column}</div>
        ))
      )}
    </div>
  );
}

export default Board;
