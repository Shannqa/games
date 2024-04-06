import { useState } from "react";
import styles from "./Battleships.css";

function Battleships() {
  
  const [stage, setStage] = useState("preparing");
  
  return(
    <div className={style.gameWindow}>
    {stage === "preparing" ? <Pregame /> : null}
    </div>
  )
  
  
}