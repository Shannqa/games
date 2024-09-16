import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../root/Root.jsx";
import styles from "../../styles/brickshooter.module.css";
import { startGame, winLevelNext, resetGame } from "./stages.js";
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
          text={<h3>Click to begin!</h3>}
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
              <h3>Congratulations, you beat all levels!</h3>
              <p>You earned {score} points.</p>
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
              <h3>Congratulations, you beat all levels!</h3>
              <p>You earned {score} points.</p>
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
              <h3>Game over</h3>
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
              <h3>New highscore!</h3>
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
          text={<h3>Would you like to play again?</h3>}
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
              <h3>Good job!</h3>
              <p>Current score: {score}</p>
              <p>Lives left: {lives}</p>
            </>
          }
        />
      </>
    );
  }
}

export default Modal;
