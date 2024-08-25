import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Root.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.left}>
            <h2>Retro games. Coded by one student</h2>
            <div className={styles.textOuter}>
              <div className={styles.text}>
                <div className={styles.textInner}>
                  <p>
                    Games are fun! What better way to study and practice web
                    development than to try and recreate some
                    not-too-complicated games we've all grown up playing.
                  </p>
                  <p>
                    Here you'll find some games I've made with React. The
                    scource code is available on Github, each game inside a
                    separate folder in components.
                  </p>
                  <p>Have fun!</p>
                </div>
              </div>
            </div>
          </div>

          <img
            src="/control-5127467_640.svg"
            width="200px"
            className={styles.controller}
          />
        </div>
      </div>
      <div className={styles.homeLinks}>
        <h2>Play a game</h2>
        <div>
          <Link className={styles.homeLink} to="/battleships">
            Battleships
          </Link>
          <Link className={styles.homeLink} to="/minesweeper">
            Minesweeper
          </Link>
          <Link className={styles.homeLink} to="/brickshooter">
            Brickshooter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
