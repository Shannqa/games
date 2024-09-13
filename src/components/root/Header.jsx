import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Root.module.css";
import Menu from "./Menu";

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Gaming Corner</Link>
      </h1>
      <Menu />
    </header>
  );
}

export default Header;
