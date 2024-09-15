import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../root/Root.jsx";
import styles from "../../styles/brickshooter.module.css";
import {
  startGame,
  winLevelNext,
  resetGame,
  lifeLoss,
  gameLoss,
  winLevel,
  winGame,
  gameStage,
  changeGameStage,
  resetStats,
} from "./stages.js";
import Dialog from "./Dialog.jsx";
import { isHighscore } from "./score.js";

function Modal({
  lives,
  score,
  gameState,
  setGameState,
  modal,
  setModal,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks,
}) {
  const { scoresBS, setScoresBS } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");
  // const [modalType, setModalType] = useState(null);
  const [modalLoadedOpen, setModalLoadedOpen] = useState(false);
  const [modalWinOpen, setModalWinOpen] = useState(false);
  const [modalWinHSOpen, setModalWinHSOpen] = useState(false);
  const [modalLossOpen, setModalLossOpen] = useState(false);
  const [modalLossHSOpen, setModalLossHSOpen] = useState(false);
  const [modalAgainOpen, setModalAgainOpen] = useState(false);
  const [modalNextOpen, setModalNextOpen] = useState(false);

  useEffect(() => {
    if (modal) {
      const highscore = isHighscore(scoresBS, score);
      if (gameState === "loaded") {
        setModalLoadedOpen(true);
      } else if (gameState === "gameWin") {
        if (highscore) {
          setModalWinHSOpen(true);
        } else {
          setModalWinOpen(true);
        }
      } else if (gameState === "gameLoss") {
        if (highscore) {
          setModalLossHSOpen(true);
        } else {
          setModalLossOpen(true);
        }
      } else if (gameState === "playAgain") {
        setModalAgainOpen(true);
      } else if (gameState === "nextLevel") {
        setModalNextOpen(true);
      }
    }
  }, [modal]);

  function addScore(e) {
    e.preventDefault();
    const server = import.meta.env.VITE_SERVER;
    fetch(`${server}/api/scores`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game: "brickshooter",
        name: playerName,
        score: score,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
      })
      .finally(() => {
        setGameState("playAgain");
        setModalAgainOpen(true);
      })
      .catch((err) => {
        setGameState("playAgain");
        setModalAgainOpen(true);
        console.log(err);
      });
  }

  function cancelScore(e) {
    e.preventDefault();
    setGameState("playAgain");
    setModalAgainOpen(true);
  }

  if (modal) {
    return (
      <>
        {/* beginning of the game */}
        <Dialog
          isOpen={modalLoadedOpen}
          confirm="Start game"
          onConfirm={() => {
            setModalLoadedOpen(false);
            startGame(
              setModal,
              setGameState,
              setLevelSave,
              savedBricks,
              setSavedBricks,
              bricks
            );
          }}
          onCancel={null}
          text={<p>Click to begin!</p>}
        />

        {/* game won, beat all levels */}
        <Dialog
          isOpen={modalWinOpen}
          confirm="Start game"
          onConfirm={() => {
            setModalWinOpen(false);
            startGame(
              setModal,
              setGameState,
              setLevelSave,
              savedBricks,
              setSavedBricks,
              bricks
            );
          }}
          onCancel={null}
          text={
            <>
              <p>Congratulations, you beat all levels!</p>
              <p>Your earned {score} points.</p>
              <p>Would you like to play again?</p>
            </>
          }
        />

        {/* game won, beat all levels - new highscore*/}
        <Dialog
          isOpen={modalWinHSOpen}
          confirm="Save score"
          onConfirm={(e) => {
            setModalWinHSOpen(false);
            addScore(e);
          }}
          onCancel={(e) => {
            setModalWinHSOpen(false);
            cancelScore(e);
          }}
          input={(e) => setPlayerName(e.target.value)}
          text={
            <>
              <p>Congratulations, you beat all levels!</p>
              <p>Your earned {score} points.</p>
              <p>Enter your name:</p>
            </>
          }
        />

        {/* game loss */}
        <Dialog
          isOpen={modalLossOpen}
          confirm="Play again"
          onConfirm={() => {
            setModalLossOpen(false);
            resetGame(
              setModal,
              setGameState,
              setLevelSave,
              savedBricks,
              setSavedBricks,
              bricks
            );
          }}
          onCancel={null}
          text={
            <>
              <p>Game over</p>
              <p>You earned {score} points</p>
              <p>Would you like to try again?</p>
            </>
          }
        />

        {/* game loss - new highscore*/}
        <Dialog
          isOpen={modalLossHSOpen}
          confirm="Save score"
          onConfirm={(e) => {
            setModalLossHSOpen(false);
            addScore(e);
          }}
          onCancel={(e) => {
            setModalLossHSOpen(false);
            cancelScore(e);
          }}
          input={(e) => setPlayerName(e.target.value)}
          text={
            <>
              <p>New highscore!</p>
              <p>You earned {score} points</p>
              <p>Enter your name:</p>
            </>
          }
        />

        {/* play again */}
        <Dialog
          isOpen={modalAgainOpen}
          confirm="Start game"
          onConfirm={() => {
            setModalAgainOpen(false);
            resetGame(
              setModal,
              setGameState,
              setLevelSave,
              savedBricks,
              setSavedBricks,
              bricks
            );
          }}
          onCancel={null}
          text={<p>Would you like to play again?</p>}
        />

        {/* next level */}
        <Dialog
          isOpen={modalNextOpen}
          confirm="Continue"
          onConfirm={() => {
            setModalNextOpen(false);
            winLevelNext(
              setModal,
              setGameState,
              setLevelSave,
              savedBricks,
              setSavedBricks,
              bricks
            );
          }}
          onCancel={null}
          text={
            <>
              <p>Good job!</p>
              <p>Current score: {score}</p>
              <p>Lives left: {lives}</p>
            </>
          }
        />
      </>
    );
  }

  // if (modal) {
  //   if (gameState === "loaded") {
  //     return (
  //       <div className={`${styles.modal}`}>
  //         <div>Click to begin!</div>
  //         <button
  //           onClick={() =>
  //             startGame(
  //               setModal,
  //               setGameState,
  //               setLevelSave,
  //               savedBricks,
  //               setSavedBricks,
  //               bricks
  //             )
  //           }
  //         >
  //           Start game
  //         </button>
  //       </div>
  //     );
  //   } else if (gameState === "gameWin") {
  //     return (
  //       <div className={`${styles.modal} ${styles.win}`}>
  //         <p>Congratulations, you beat all levels!</p>
  //         <div>Your earned {score} points.</div>
  //         {isHighscore() ? (
  //           <div>
  //             Enter the name you want to be remembered by:
  //             <input
  //               type="text"
  //               placeholder="Your name..."
  //               onChange={(e) => setPlayerName(e.target.value)}
  //             />
  //             <button onClick={addScore}>Save score</button>
  //           </div>
  //         ) : (
  //           <button
  //             onClick={() =>
  //               resetGame(
  //                 setModal,
  //                 setGameState,
  //                 setLevelSave,
  //                 savedBricks,
  //                 setSavedBricks,
  //                 bricks
  //               )
  //             }
  //           >
  //             Play again
  //           </button>
  //         )}
  //       </div>
  //     );
  //   } else if (gameState === "gameLoss") {
  //     return (
  //       <div className={`${styles.modal} ${styles.loss}`}>
  //         {isHighscore() ? (
  //           <div>
  //             <p>New highscore!</p>
  //             <div>You earned {score} points</div>
  //             <div>Enter your name:</div>
  //             <input
  //               type="text"
  //               placeholder="Your name..."
  //               onChange={(e) => setPlayerName(e.target.value)}
  //             />
  //             <div className={styles.buttons}>
  //               <button onClick={(e) => addScore(e)}>Save score</button>
  //               <button onClick={(e) => cancelScore(e)}>Cancel</button>
  //             </div>
  //           </div>
  //         ) : (
  //           <div>
  //             <p>Game over</p>
  //             <div>You earned {score} points</div>
  //             <div>Would you like to try again?</div>
  //             <button
  //               onClick={() =>
  //                 resetGame(
  //                   setModal,
  //                   setGameState,
  //                   setLevelSave,
  //                   savedBricks,
  //                   setSavedBricks,
  //                   bricks
  //                 )
  //               }
  //             >
  //               Play again
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   } else if (gameState === "playAgain") {
  //     return (
  //       <div className={`${styles.modal} ${styles.loss}`}>
  //         <div>Would you like to play again?</div>
  //         <button
  //           onClick={() =>
  //             startGame(
  //               setModal,
  //               setGameState,
  //               setLevelSave,
  //               savedBricks,
  //               setSavedBricks,
  //               bricks
  //             )
  //           }
  //         >
  //           Play again
  //         </button>
  //       </div>
  //     );
  //   } else if (gameStage === "nextLevel") {
  //     return (
  //       <div className={`${styles.modal} ${styles.win}`}>
  //         <div>Good job!</div>
  //         <div>Current score: {score}</div>
  //         <div>Lives left: {lives}</div>
  //         <button
  //           onClick={() =>
  //             winLevelNext(
  //               setModal,
  //               setGameState,
  //               setLevelSave,
  //               savedBricks,
  //               setSavedBricks,
  //               bricks
  //             )
  //           }
  //         >
  //           Continue
  //         </button>
  //       </div>
  //     );
  //   }
  // }
}

export default Modal;
