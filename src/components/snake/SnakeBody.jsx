import { useContext } from "react";
import { SnakeContext } from "./SnakeGame.jsx";
import styles from "./Snake.module.css";

function SnakeBody() {
  const { snake } = useContext(SnakeContext);
  return(
    <div clasaName={styles.snakeBody}>
      {snake.map(cell => <div style={`top: ${cell[0]}%, left: ${cell[1]}%`}></div>)}
    </div>
  )
}

export default SnakeBody