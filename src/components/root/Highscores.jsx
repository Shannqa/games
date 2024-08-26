import React, { useContext } from "react";
import { AppContext } from "../root/Root.jsx"

function Highscores() {
  const { scoresBS, setScoresBS } = useContext(AppContext);
  
  
  
  return(
  <div>
    <h2>Brickshooter</h2>
    
  </div>
  )
}

export default Highscores