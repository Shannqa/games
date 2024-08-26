import React, { useEffect, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/Root.module.css";

export const AppContext = createContext({
  scoresBS: [],
  setScoresBS: () => {},
});

function Root() {
  const [scoresBS, setScoresBS] = useState(null);

  // fetch highscores from db
  useEffect(() => {
    fetch("/api/scores", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body) {
          setScoresBS(body.brickshooter);
          console.log(body);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider
      value={{
        scoresBS,
        setScoresBS,
      }}
    >
      <div className={styles.root}>
        <div className={styles.top}>
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default Root;
