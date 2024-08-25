import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
// import "../../../src/styles/App.css";
import styles from "../../styles/Root.module.css";

// import "./Root.css";
import Battleships from "../battleships/Battleships";

function Root() {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
