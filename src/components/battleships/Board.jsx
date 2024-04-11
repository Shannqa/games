import { useContext, useState } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import styles from "./Battleships.module.css";

function Board({ grid, owner }) {
  const { playerGrid, computerGrid, setComputerGrid, currentMove, setCurrentMove, computerShipList, setComputerShipList } = useContext(BattleshipsContext);
  const [attackQueue, setAttackQueue] = useState([]);
  
 function playerAttack(coords) {
   if (currentMove === "player") {
    const [row, column] = coords; 
    console.log(coords)
    const attackedCell = computerGrid[row][column];
    let newState;
    if (attackedCell === "miss" || attackedCell === "hit") {
      console.log("invalid move");
      return; 
    } else if (attackedCell === null) {
      newState = "miss";
    } else {
      newState = "hit";
      // on hit, mark the coordinate on the computer ship list
      setComputerShipList({...computerShipList,
      [attackedCell]: [
        ...computerShipList[attackedCell],
        [row][column] = "hit"
      ]});
    }
    // update the state of the computer's grid
    setComputerGrid(computerGrid.map((gridRow, rowIndex) => gridRow.map((gridColumn, colIndex) => {
      if (rowIndex == row && colIndex == column) {
        gridColumn = newState;
        console.log(gridColumn);
      }
      return gridColumn;
    })));

    console.log(computerGrid);

    setCurrentMove("computer");
    computerAttack();
   } else {
     return;
   }
 }
  
  
 function computerAttack() {
   if (attackQueue.length === 0) {
     doRandomAttack()
   }
   setCurrentMove("player");
 }
  
  function doRandomAttack() {
    const row = Math.floor(Math.random() * 9);
    const column = Math.floor(Math.random() * 9);
    console.log("random");
    // const attackedCell = 
    // if (playerGrid[row][column] === "hit" || playerGrid[row][column] === "miss") {
    //   return doRandomAttack();
    // } else if ()
  }
  
  
  if (owner === "player") {
    return(
      <div className={`${styles.board} ${styles.ownBoard}`}>
        {grid.map((row, rindex) => (
          row.map((column, cindex) => (<div className={styles.cell} data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}>{column}</div>))))
        }
      </div>
    ) 
  } else {
    return(
      <div className={`${styles.board} ${styles.enemyBoard}`}>
        {grid.map((row, rindex) => (
          row.map((column, cindex) => (<div className={styles.cell} data-row={rindex} data-column={cindex} key={rindex + "-" + cindex} onClick={() => playerAttack([rindex, cindex])}>{column}</div>))
      ))}
    </div>
    )
  }
}

export default Board
