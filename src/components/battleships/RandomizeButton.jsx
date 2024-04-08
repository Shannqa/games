import styles from "./Battleships.module.css";

function RandomizeButton({ onClick }) {
  
  return(
    <button className={styles.button} onClick={onClick}>Randomize ships</button>
    )
}

export default RandomizeButton