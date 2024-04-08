import styles from "./Battleships.module.css";

function StartButton({ onClick }) {
  
  return(
    <button className={styles.button} onClick={onClick}>Start Game</button>
    )
}

export default StartButton