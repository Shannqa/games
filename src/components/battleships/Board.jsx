import { useContext, useState } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import styles from "./Battleships.module.css";

function Board({ grid, owner }) {
  const { playerGrid, setPlayerGrid, computerGrid, setComputerGrid, currentMove, setCurrentMove, computerShipList, setComputerShipList, playerShipList, setPlayerShipList } = useContext(BattleshipsContext);
  const [attackQueue, setAttackQueue] = useState([]);
  const [attackHits, setAttackHits] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const maxScore = 14;
  
 function playerAttack(coords) {
   if (currentMove === "player") {
    const [row, column] = coords; 
    console.log(coords)
    const attackedCell = computerGrid[row][column];
    let newCellValue;
    if (attackedCell === "miss" || attackedCell === "hit") {
      console.log("invalid move");
      return; 
    } else if (attackedCell === null) {
      newCellValue = "miss";
    } else {
      newCellValue = "hit";
      setPlayerScore(playerScore + 1);
      if (playerScore >= maxScore - 1) {
        console.log("player won");
      }
    }
    // update the state of the computer's grid
    setComputerGrid(computerGrid.map((gridRow, rowIndex) => gridRow.map((gridColumn, colIndex) => {
      if (rowIndex == row && colIndex == column) {
        gridColumn = newCellValue;
        console.log(gridColumn);
      }
      return gridColumn;
    })));

    setCurrentMove("computer");
    compAttack(attackQueue);
   } else {
     return;
   }
 }
    /*
  function computerAttack() {
    let coords;
    let newCellValue;
    if (attackQueue.length === 0) {
      coords = getRandomCoords();
    } else {
      coords = newQueue.shift();
    }
    const [row, column] = coords;
    const attackedCell = playerGrid[row][column];
    
    if (attackedCell === "hit" || attackedCell === "miss") {
      // invalid move, try again with different random numbers
      return computerAttack();
    } else if (attackedCell === null) {
      newCellValue = "miss";
    } else {
      newCellValue = "hit";
      setComputerScore(computerScore + 1);
      if (computerScore >= maxScore - 1) {
        console.log("computer won");
      } else {
        setAttackHits(...attackHits, [row, column]);
        if (attackHits.length == 0) {
          // if it's the first hit in a row, add four sides of the current hit to the queue
          setAttackQueue([[row - 1, column], [row + 1, column], [row, column - 1], [row, column + 1]]);
        } else {
          // if not, check if the previous hit was adjacent and in which direction
          console.log(attackHits);
          console.log(attackHits[attackHits.length - 1]);
          const [prevRow, prevCol] = attackHits[attackHits.length - 1];
          if (prevRow == row) {
            // row is the same
            let newQueue = [...attackQueue, [row, column - 1], [row, column + 1]]
            setAttackQueue(newQueue.filter(item => item[0] == row));
          } else if (prevCol == column) {
            // column is the same
            let newQueue = [...attackQueue, [row - 1, column], [row + 1, column]]
            setAttackQueue(newQueue.filter(item => item[1] == column));
          }
        }
        
      }

    }
    // update the state of the player's grid
    setPlayerGrid(playerGrid.map((gridRow, rowIndex) => gridRow.map((gridColumn, colIndex) => {
      if (rowIndex == row && colIndex == column) {
        gridColumn = newCellValue;
      }
      return gridColumn;
    })));
    
    setCurrentMove("player");
  }
  
  function getRandomCoords() {
    const row = Math.floor(Math.random() * 9);
    const column = Math.floor(Math.random() * 9);
    return [row, column]
  }
  
  
  
  let aiqueue = [];
  let aihits = [];
  let aisunk = [];
  */
////////////
function compAttack(queue) { 
  let coords;
  let newQueue = [...queue];
  let newCellValue;

  if (newQueue.length === 0) {
    coords = randomAtt();
  } else {
    // random cell from the queue
    console.log(newQueue);
    let randomNr = Math.floor(Math.random() * newQueue.length)
    coords = newQueue[randomNr];
    console.log(coords);
    newQueue = newQueue.filter((item, index) => index !== randomNr);
  }
  const [row, column] = coords;
  console.log(row);
  console.log(column);
  console.log(playerGrid[row][column])
  console.log(coords)
  const target = playerGrid[row][column];  
  if (target === "hit" || target === "miss") {
    // invalid move
    return compAttack(newQueue);
  } else if (target === null) {
    // miss
    newCellValue = "miss";
    // update grid
    if (newQueue.length === 0) {
      // if the queue has been emptied, stop hunting adjacent spots
      // check how many hits we got, and add this number as a possibly sunk ship
      //aisunk.push(aihits.length);
      setAttackHits([]);
    }
  } else {
    // hit
    newCellValue = "hit";
    setAttackHits(attackHits.concat([coords]));
    if (attackHits.length === 0) {
      // add four adjacent cells to the queue
    if (row > 0) {
      newQueue.push([row - 1, column]);
    }
    if (row < 9) {
      newQueue.push([row + 1, column])
    }
    if (column > 0) {
      newQueue.push([row, column - 1])
    }
    if (column < 9) {
      newQueue.push([row, column + 1])
    }
    setAttackQueue([...newQueue]);
      // setAttackQueue(...attackQueue, [row - 1, column], [row + 1, column], [row, column - 1], [row, column + 1]);
    } else {
      let previousHit = attackHits[attackHits.length - 1];
      console.log(attackHits);
      console.log(previousHit);
      const [prevRow, prevCol] = previousHit;

      if (prevRow === row) {
        // row is the same
        if (column > 0) {
          newQueue.push([row, column - 1])
        }
        if (column < 9) {
          newQueue.push([row, column + 1])
        }
        newQueue = newQueue.filter((item) => item[0] === row);
        setAttackQueue([...newQueue]);
      } else if (prevCol === column) {
        // column is the same
        if (row > 0) {
          newQueue.push([row - 1, column]);
        }
        if (row < 9) {
          newQueue.push([row + 1, column])
        }
        newQueue = newQueue.filter((item) => item[1] === column); // filter didnt work, had a coord with wrong column still
        setAttackQueue([...newQueue]);
      }
    }
    
  }
  // update the state of the player's grid
  setPlayerGrid(playerGrid.map((gridRow, rowIndex) => gridRow.map((gridColumn, colIndex) => {
    if (rowIndex == row && colIndex == column) {
      gridColumn = newCellValue;
    }
    return gridColumn;
  })));
  setCurrentMove("player");
}
  
function randomAtt() {
  const row = Math.floor(Math.random() * 9);
  const column = Math.floor(Math.random() * 9);
  const target = playerGrid[row][column];
  if (target === "hit" || target === "miss") {
    // invalid move, randomize again
    return randomAtt();
  }
  return [row, column]
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
