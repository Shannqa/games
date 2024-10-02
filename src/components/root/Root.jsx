import React, { useEffect, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/Root.module.css";

export const AppContext = createContext({
  scoresBS: [],
  setScoresBS: () => {},
  loadingScores: "",
  setLoadingScores: () => {},
});

function Root() {
  const [scoresBS, setScoresBS] = useState(null);
  const [loadingScores, setLoadingScores] = useState(false);
  const [port, setPort] = useState(() => {
    if (import.meta.env.VITE_ENV === "DEV") {
      return parseInt(import.meta.env.VITE_PORT);
    } else {
      return null;
    }
  });
  const [apiUrl, setApiUrl] = useState(() => {
    if (import.meta.env.VITE_ENV === "DEV") {
      return `${import.meta.env.VITE_SERVER}:${port}`;
    } else {
      return `${import.meta.env.VITE_SERVER}`;
    }
  });
  // fetch highscores from db
  useEffect(() => {
    setLoadingScores(false); // disable scores
    // setLoadingScores(true);
    // fetch(`${apiUrl}/api/scores`, {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((body) => {
    //     if (body) {
    //       setScoresBS(body.brickshooter);
    //       console.log(body);
    //     }
    //   })
    //   .catch((err) => {
    //     // if (import.meta.env.VITE_ENV === "DEV") {
    //     //   if (port > parseInt(import.meta.env.VITE_PORT) + 3) {
    //     //   } else {
    //     //     console.log(
    //     //       `Not connected on port ${port}. Trying port ${port + 1}...`
    //     //     );
    //     //     setPort(port + 1);
    //     //     setApiUrl(`${import.meta.env.VITE_SERVER}:${port + 1}`);
    //     //   }
    //     //   console.log(err.message);
    //     // } else {
    //     //   console.log(err.message);
    //     // }
    //   })
    //   .finally(setLoadingScores(false));
  }, [apiUrl]);

  return (
    <AppContext.Provider
      value={{
        scoresBS,
        setScoresBS,
        loadingScores,
        setLoadingScores,
      }}
    >
      <div className={styles.root}>
        <div className={styles.main}>
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default Root;
