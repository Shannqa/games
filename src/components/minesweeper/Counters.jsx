import React from "react";

function Counters() {
  let minesLeft;
  let timeElapsed;
  return (
    <div>
      <div>
        <span>Mines left</span>
        <div>{minesLeft}</div>
      </div>
      <div>
        <span>Time</span>
        <div>{timeElapsed}</div>
      </div>
    </div>
  );
}

export default Counters;