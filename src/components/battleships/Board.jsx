import { useContext } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import styles from "./Battleships.module.css";

function Board({ grid, owner }) {
  const { playerGrid, computerGrid, setComputerGrid, currentMove, setCurrentMove, computerShipList, setComputerShipList } = useContext(BattleshipsContext);
  const [attackQueue, setAttackQueue] = useState([]);
  
 function playerAttack(coords) {
   if (currentMove === "player") {
    const [row, column] = coords; 
    const attackedCell = (computerGrid[row][column]);
    let newState;
    if (attackedCell === "miss" || attackedCell === "hit") {
      consile.log("invalid move");
      return; 
    } else if (attackedCell === null) {
      newState = "miss";
    } else if (isNumber(attackedCell)) {
      newState = "hit";
      setComputerShipList({...computerShipList,
      [attackedCell]: [...arr, [row, column] = "hit"]
      })
    }
    
    setComputerGrid(computerGrid.map((gridRow, indexRow) => {
      gridRow.map((gridColumn, indexColumn) => {
        if (indexRow == row && indexColumn == column) {
          column = newState
        }
      })
    }));
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
 }
  
  function doRandomAttack() {
    const row = Math.floor(Math.random() * 9);
    const column = Math.floor(Math.random() * 9);
    const attackedCell = 
    if (playerGrid[row][column] === "hit" || playerGrid[row][column] === "miss") {
      return doRandomAttack();
    } else if ()
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
          row.map((column, cindex) => (<div className={styles.cell} data-row={rindex} data-column={cindex} key={rindex + "-" + cindex} onClick={() => playerAttack([row, column])}>{column}</div>))
      ))}
    </div>
    )
  }
}

export default Board
