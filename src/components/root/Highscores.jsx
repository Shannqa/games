import React, { useContext } from "react";
import { AppContext } from "../root/Root.jsx";
import styles from "../../styles/Root.module.css";

function Highscores() {
  const { scoresBS, setScoresBS } = useContext(AppContext);
  console.log(scoresBS);
  return (
    <div className={styles.highscores}>
      <h2>Highscores</h2>
      <h3>Brickshooter</h3>
      <table>
        <tbody>
          {scoresBS &&
            scoresBS.map((score) => {
              return (
                <tr key={score._id}>
                  <th>{score.name}</th>
                  <td>{score.score} points</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Highscores;
