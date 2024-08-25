import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Root.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">Credits</Link>
        </li>
        <li>
          <a href="https://github.com/Shannqa/games">Github</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
