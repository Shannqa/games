import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Root.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <span>
        Created by <a href="https://shannqa.com/">Shannqa</a>
      </span>
    </div>
  );
}

export default Footer;
