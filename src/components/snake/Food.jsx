import { useContext } from "react";
import { SnakeContext } from "./Snake.jsx";
import styles from "./Snake.module.css";

function Food() {
  const { food } = useContext(SnakeContext);

  // left: ${cell[1]}%
  return(
    <div className={styles.food} style={{top: `${food[0]}%`, left: `${food[1]}%`}}>
    </div>
  )
}

export default Food