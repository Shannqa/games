import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p>This is home.</p>
      <Link to="/battleships">Battleships</Link>
      <Link to="/minesweeper">Minesweeper</Link>
    </div>
  );
}

export default Home;
