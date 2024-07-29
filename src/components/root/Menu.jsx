import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/battleships">Battleships</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
