import { useContext } from "react";
import { SnakeContext } from "./Snake.jsx";
import styles from "./Snake.module.css";

function SnakeBody() {
  const { snake } = useContext(SnakeContext);

  return(
    <div className={styles.snakeBody}>
      {snake.map((cell, index) => <div key={index} style={{top: `${cell[0]}%`, left: `${cell[1]}%`}}></div>)}
    </div>
  )
}

export default SnakeBody