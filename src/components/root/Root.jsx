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
  const server = import.meta.env.VITE_SERVER;
  const port = import.meta.env.VITE_PORT;
  console.log(server);
  console.log(port);

  // fetch highscores from db
  useEffect(() => {
    fetch(`${server}:${port}/api/scores`, {
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
