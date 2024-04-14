import styles from "./Battleships.module.css";

function PlayAgainButon({ onClick }) {
  
  return(
    <button className={styles.button} onClick={onClick}>Play again</button>
    )
}

export default PlayAgainButon