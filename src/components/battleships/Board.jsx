import styles from "./Battleships.module.css";

function Board({ grid, owner }) {

  return(
    <div className={owner== "player" ? `${styles.board} ${styles.ownBoard}` : `${styles.board} ${styles.enemyBoard}`}>
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className={styles.cell} data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}>{column}</div>))
      ))}
    </div>
  )
}

export default Board
