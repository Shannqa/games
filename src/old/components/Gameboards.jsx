import React, { useState } from "react";
import Grid from "./Grid.jsx";
function Gameboards({ gridHuman, gridAI }) {
  
  //boardHuman, setterHuman, boardAI, setterAI
  return(
    <div className="gameboards">
      <div>
        <h3>Your Board</h3>
        <Grid owner="human" grid={gridHuman} />
      </div>
      <div>
        <h3>Enemy Board</h3>
        <Grid owner="AI" grid={gridAI} />
      </div>
    </div>
  )
}


export default Gameboards