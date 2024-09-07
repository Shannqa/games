import React, { useState, useEffect } from "react";
import { snake, drawSnake, moveSnake, detectCollision } from "./snake.js";
import Canvas from "./Canvas.jsx";
import { keyDown } from "./keyboard.js";
import settings from "./settings";
import styles from "../../styles/snake.module.css";
import {
  foodOn,
  drawFood,
  randomFood,
  checkFood,
  timeoutFood,
} from "./food.js";
import { score, intervalScore } from "./score.js";
import Modal from "./Modal";
import { setLoss } from "./stages.js";

export let gameStage = "loaded";

export function changeGameStage(stage) {
  gameStage = stage;
}

function Game() {
  const [gameState, setGameState] = useState("loaded");
  const [modal, setModal] = useState(true);

  if (!modal) {
    document.onkeydown = keyDown;
  }

  useEffect(() => {
    let inter;
    if (gameState === "playing") {
      inter = setInterval(() => {
        score.score += 10;
      }, 5000);
    }
    return () => {
      clearInterval(inter);
    };
    // let inter;

    // if (gameState === "playing") {
    //   inter = setInterval(() => {
    //     score.score += 10;
    //   }, 5000);
    // } else {
    //   console.log("clear");
    //   clearInterval(inter);
    //   console.log(inter);
    // }
  }, [gameState]);

  if (gameState === "playing") {
    timeoutFood();
  }

  function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    score.draw(ctx);
    if (gameState === "loaded") {
      return;
    } else if (gameState === "loss") {
      drawSnake(ctx);
      return;
    } else {
      drawSnake(ctx);
      detectCollision(setGameState, setModal);
    }
    if (foodOn) {
      drawFood(ctx);
      const isFoodEaten = checkFood();
      if (!isFoodEaten) {
        moveSnake();
      } else {
        moveSnake(true);
      }
    } else {
      moveSnake();
    }
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas width={settings.canvasW} height={settings.canvasH} draw={draw} />
      <Modal
        modal={modal}
        setModal={setModal}
        gameState={gameState}
        setGameState={setGameState}
        score={score}
      />
    </div>
  );
}

export default Game;
